import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../api/posts"
import { updateUser } from "../features/user/userSlice"

const useUserDetails = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)

  const {data,isError,isLoading} = useQuery({
    queryKey:['userDetails'],
    queryFn: getUserInfo
  })
  if (!isError && !isLoading) {
    if (user == null) {
      dispatch(updateUser(data.user))
    }
  }

  return { data, isLoading,isError }
}

export default useUserDetails
