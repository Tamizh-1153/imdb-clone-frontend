import useGetAllMovies from '../../hooks/useGetAllMovies'
import useUserDetails from '../../hooks/useUserDetails'
import Movies from '../../components/movies/Movies';

const Home = () => {
  const {data,isLoading,isError} = useGetAllMovies()
  useUserDetails()

 

  return (
    <>
    <Movies movies={data} isLoading={isLoading} isError={isError} />
    </>
  )
}

export default Home