import  { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { createUser } from "../api/posts"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

const Register = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const refresh = useNavigate()

  const { mutate } = useMutation({
    mutationFn: ({ name, email, password }) =>
      createUser({ name, email, password }),
    onSuccess: (data) => {
      if (data.user) {
        toast.success(data.message)
        refresh("/login")
      } else {
        toast.error(data.message)
      }
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutate({ name, email, password })
  }

  return (
    <div data-bs-theme="dark">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4">
          <div className="card my-5">
            <div className="card-body">
              <div className="d-flex justify-content-center mt-5 mb-2"></div>
              <p className="card-title text-center mb-4 fs-4">
                Create a IMDB Clone Account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mx-1">
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <br />
                <div className="mb-3 mx-1">
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <br />
                <div className="mb-1 mx-1">
                  <input
                    className="form-control "
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <br />

                <div className="text-center">
                  <input
                    className="btn login_button my-3 "
                    type="submit"
                    value="Register"
                  />
                </div>
                <div className="text-center">
                  <Link to="/login">
                    Already a member? Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
