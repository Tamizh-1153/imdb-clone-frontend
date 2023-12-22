import React from 'react'
import useGetAllMovies from '../../hooks/useGetAllMovies'
import { Container, Loader } from '@mantine/core';
import Movies from '../../components/movies/Movies';

const Home = () => {
  const {data,isLoading,isError} = useGetAllMovies()

 

  return (
    <>
    <Movies movies={data} isLoading={isLoading} isError={isError} />
    </>
  )
}

export default Home