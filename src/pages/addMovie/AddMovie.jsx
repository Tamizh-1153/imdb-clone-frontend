import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  InputWrapper,
  Modal,
  MultiSelect,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import React, { useState } from "react"
import AddActor from "../../components/addActor/AddActor"
import AddProducer from "../../components/addProducer/AddProducer"
import { useSelector } from "react-redux"
import { addMovieToServer, validateParagraph, validateString } from "../../api/posts"
import UploadPoster from "../../components/uploadPoster/UploadPoster"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddMovie = () => {
  // useGetAllActors()
  // useGetAllProducers()
  const { actors, producers } = useSelector((store) => store.user)
  const [actorOpen, setActorOpen] = useState(false)
  const [producerOpen, setProducerOpen] = useState(false)
  const [imageURL, setImageURL] = useState("")
  const refresh = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
      title: "",
      yearOfRelease: "",
      plot: "",
      trailer:'',
      actor: [],
      producer: "",
    },

    validate: {
      title: (value) => validateString(value),
      yearOfRelease: (value) => validateString(value),
      plot: (value) => validateParagraph(value),
      producer: (value) => validateString(value),
      trailer: (value) => validateString(value),
    },
  })

  const { title, yearOfRelease, plot, producer, actor,trailer } = form.values

   const { mutate } = useMutation({
     mutationFn: (movieDetails) => addMovieToServer(movieDetails),
     onSuccess: () => {
       toast.success("Movie added successfully")
       form.reset()
       queryClient.invalidateQueries({queryKey:['allMovies']})
       refresh('/')
     },
   })

  const handleSubmit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) {
      let actorsId=[]
      
      actor.forEach(actorName=>{
        const matchingActor = actors?.find(item=>item.name == actorName)
        if(matchingActor){
          actorsId.push(matchingActor._id)
        }
      })
      const producerId =producers.find(item=>item.name==producer)
      let movieDetails = {
        title: title,
        yearOfRelease: yearOfRelease,
        plot: plot,
        poster: imageURL,
        trailer:trailer,
        actors: actorsId,
        producer: producerId,
      }
      mutate(movieDetails)
    }
  }

  return (
    <Box maw={500}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <InputWrapper mt={"1rem"} withAsterisk label="Title">
          <Input
            mt={".3rem"}
            label="Title"
            placeholder="Movie Title"
            {...form.getInputProps("title")}
          />
        </InputWrapper>
        <InputWrapper mt={".7rem"} withAsterisk label="Year of Release">
          <DateInput
            mt={".3rem"}
            style={{ width: "50%" }}
            withAsterisk
            valueFormat="DD/MM/YYYY"
            placeholder="Year of Release"
            {...form.getInputProps("yearOfRelease")}
          />
        </InputWrapper>
        <InputWrapper mt={".7rem"} withAsterisk label="Plot">
          <Textarea
            mt={".3rem"}
            autosize
            withAsterisk
            placeholder="Movie plot..."
            minRows={4}
            {...form.getInputProps("plot")}
          />
        </InputWrapper>
        <InputWrapper mt={".7rem"} withAsterisk label="Upload Poster">
          <UploadPoster imageURL={imageURL} setImageURL={setImageURL} />
        </InputWrapper>
        <InputWrapper
          mt={".7rem"}
          withAsterisk
          label="Trailer (Youtube Embed link only)"
        >
          <Input mt={'.3rem'}
            placeholder="Ex:  youtube.com/embed/mNgwNXKBEW0"
            {...form.getInputProps("trailer")}
          />
        </InputWrapper>
        <InputWrapper mt={".7rem"} withAsterisk label="Actors">
          <Flex>
            <MultiSelect
              style={{ width: "50%" }}
              mt={".3rem"}
              placeholder="Select actors"
              data={actors?.map((actor) => actor.name)}
              {...form.getInputProps("actor")}
            />
            <AddActor actorOpen={actorOpen} setActorOpen={setActorOpen} />
            <Button
              color="gray"
              onClick={() => setActorOpen(true)}
              mx={".4rem"}
              mt={".3rem"}
            >
              Add Actor
            </Button>
          </Flex>
        </InputWrapper>
        <InputWrapper mt={".7rem"} withAsterisk label="Producer">
          <Flex>
            <Select
              style={{ width: "50%" }}
              placeholder="Select producer"
              mt={".3rem"}
              data={producers?.map((producer) => producer.name)}
              {...form.getInputProps("producer")}
            />
            <AddProducer
              producerOpen={producerOpen}
              setProducerOpen={setProducerOpen}
            />
            <Button
              color="gray"
              onClick={() => setProducerOpen(true)}
              mx={".4rem"}
              mt={".3rem"}
            >
              Add Producer
            </Button>
          </Flex>
        </InputWrapper>
        <Group mt={"1rem"}>
          <button className="btn login_button" type="submit">
            Add
          </button>
        </Group>
      </form>
    </Box>
  )
}

export default AddMovie
