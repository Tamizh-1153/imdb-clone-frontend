import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies } from '../features/user/userSlice'
import { useQuery } from '@tanstack/react-query'
import { getAllMovies } from '../api/posts'

const useGetAllMovies = () => {
   const dispatch = useDispatch()
   const { movies } = useSelector((store) => store.user)

   const { data, isError, isLoading } = useQuery({
     queryKey: ["allMovies"],
     queryFn: getAllMovies,
   })
   if (!isError && !isLoading) {
     if (movies == null) {
       dispatch(addMovies(data))
     }
   }

   return { data, isLoading, isError }
}

export default useGetAllMovies