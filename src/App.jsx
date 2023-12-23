import { ToastContainer } from "react-toastify"
import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Home from "./pages/home/Home"
import Layout from "./components/layout/Layout"
import AddMovie from "./pages/addMovie/AddMovie"
import MoviePage from "./pages/moviePage/MoviePage"
import useGetAllActors from "./hooks/useGetAllActors"
import useGetAllMovies from "./hooks/useGetAllMovies"
import useGetAllProducers from "./hooks/useGetAllProducers"
import useUserDetails from "./hooks/useUserDetails"

function App() {
  useGetAllActors()
  useGetAllMovies()
  useGetAllProducers()
  useUserDetails()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/forgot_password" Component={ForgotPassword} />
            <Route
              path="/reset_password/:id/:token"
              Component={ResetPassword}
            />
            <Route path="/add-movie" Component={AddMovie} />
            <Route path="/movie/:id" Component={MoviePage} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer theme="dark" position="top-right" />
    </>
  )
}

export default App
