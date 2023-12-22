import React from "react"
import "./movieCard.css"
import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const refresh = useNavigate()

  return (
    <div
      onClick={() => refresh(`/movie/${movie._id}`)}
      style={{ cursor: "pointer" }}
      className="movie_card"
    >
      <img src={movie.poster} alt="loading" />
      <p>{movie.title}</p>
    </div>
  )
}

export default MovieCard
