import { useDispatch, useSelector } from 'react-redux'
import { addActors } from '../features/user/userSlice'
import { useQuery } from '@tanstack/react-query'
import { getAllActors } from '../api/posts'

const useGetAllActors = () => {
 const dispatch = useDispatch()
 const { actors } = useSelector((store) => store.user)

 const { data, isError, isLoading } = useQuery({
   queryKey: ["allActors"],
   queryFn: getAllActors,
 })
 if (!isError && !isLoading) {
   if (actors == null) {
     dispatch(addActors(data))
   }
 }

 return { data, isLoading, isError }
}

export default useGetAllActors