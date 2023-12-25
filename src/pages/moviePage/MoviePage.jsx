import React, { useState } from "react"
import { useSelector } from "react-redux"
import useGetAllMovies from "../../hooks/useGetAllMovies"
import { Center, Container, Flex, Group, Loader } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import useGetAllActors from "../../hooks/useGetAllActors"
import useGetAllProducers from "../../hooks/useGetAllProducers"
import "./moviePage.css"
import dayjs from "dayjs"
import EditMovie from "../../components/editMovie/EditMovie"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMovie } from "../../api/posts"
import { toast } from "react-toastify"

const MoviePage = () => {
  const { data, isLoading, isError } = useGetAllMovies()
  const [open, setOpen] = useState(false)
  const { user, actors, producers } = useSelector((store) => store.user)
  const refresh = useNavigate()
  const { id } = useParams()

  const movie = data?.find((movie) => movie._id === id)
  const toYearFormat = new Date(movie?.yearOfRelease)
  const queryClient = useQueryClient()
  const actorNames = movie?.actors?.map((id) => {
    const actor = actors?.find((actor) => actor._id == id)
    return actor?.name
  })

  
  const producer = producers?.find((item) => item._id == movie?.producer)

  const {mutate } = useMutation({
    mutationFn:()=>deleteMovie(id),
    onSuccess:()=>{
      toast.success('Movie deleted successfully')
      queryClient.invalidateQueries({queryKey:['allMovies']})
      refresh('/')
    }
  })

  const handleDelete = () => {
    mutate(id)
  }

  return (
    <div >
      <Flex mt={"2rem"} direction={"column"}>
        <Flex justify={"space-between"}>
          <span className="movie_page_title">{movie?.title}</span>
          <EditMovie
            id={id}
            producers={producers}
            actors={actors}
            producerName={producer}
            actorNames={actorNames}
            movie={movie}
            open={open}
            setOpen={setOpen}
          />
          {user ? (
            <Flex gap={"1rem"}>
              <Group
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-edit"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="#ffffffbb"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </Group>
              <Group style={{ cursor: "pointer" }} onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-trash"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="#ff2825"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </Group>
            </Flex>
          ) : null}
        </Flex>
        <span className="movie_page_year">{toYearFormat.getFullYear()}</span>
        <Flex className="movie_page_visual"  wrap="wrap">
          <img
            className="movie_page_poster"
            src={movie?.poster}
            alt={movie?.title}
          />
          <iframe
            width="914"
            height="464"
            src={movie?.trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Flex>
        <span className="movie_page_plot">{movie?.plot}</span>
        <hr />
        <span>
          <strong style={{ marginRight: "4rem", fontSize: "1.2rem" }}>
            Stars
          </strong>{" "}
          {actorNames?.map((actorName, i) => (
            <span
              key={i}
              className=""
              style={{ marginRight: "1rem", fontSize: "1rem" }}
            >
              {actorName}
            </span>
          ))}
        </span>
        <hr />
        <span>
          <strong style={{ marginRight: "2rem", fontSize: "1.2rem" }}>
            Producer
          </strong>
          <span className="" style={{ marginRight: "1rem", fontSize: "1rem" }}>
            {producer?.name}
          </span>
        </span>
        <hr />
        <span style={{ marginBottom: "2rem" }}>
          <strong style={{ marginRight: "2.7rem", fontSize: "1.2rem" }}>
            Release
          </strong>
          <span className="" style={{ marginRight: "rem", fontSize: "1rem" }}>
            {dayjs(toYearFormat).format("YYYY-MM-DD")}
          </span>
        </span>
      </Flex>
    </div>
  )
}

export default MoviePage
