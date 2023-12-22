import { useDispatch, useSelector } from 'react-redux'
import { addProducers } from '../features/user/userSlice'
import { useQuery } from '@tanstack/react-query'
import { getAllProducers } from '../api/posts'

const useGetAllProducers = () => {
  const dispatch = useDispatch()
  const { producers } = useSelector((store) => store.user)

  const { data, isError, isLoading } = useQuery({
    queryKey: ["allProducers"],
    queryFn: getAllProducers,
  })
  if (!isError && !isLoading) {
    if (producers == null) {
      dispatch(addProducers(data))
    }
  }

  return { data, isLoading, isError }
}

export default useGetAllProducers