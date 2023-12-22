import { Container, Loader } from "@mantine/core"
import React from "react"
import MovieCard from "../movieCard/MovieCard"
import './movies.css'

const Movies = ({ movies, isLoading, isError }) => {
  if (isLoading) {
    return (
      <Container>
        <Loader
          style={{ width: "100%", justifyContent: "center" }}
          color="blue"
          size="xl"
          type="dots"
        />
      </Container>
    )
  }
  return (
    <div className="movies_container">
      {movies?.map((movie, i) => (
        <MovieCard key={i} movie={movie} />
      ))}
    </div>
  )
}

export default Movies
