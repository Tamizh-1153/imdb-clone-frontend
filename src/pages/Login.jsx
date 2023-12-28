import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { userLogin } from "../api/posts"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState("")
  const refresh = useNavigate()

  const { mutate } = useMutation({
    mutationFn: ({ email, password }) => userLogin({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      if (data.user) {
        toast.success(`${data.user.name} logged in`, { position: "top-right" })
        refresh('/')
        // window.location.reload()
      } else {
        toast.error(data.message)
      }
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutate({ email, password })
  }

  return (
    <div  data-bs-theme="dark">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4">
          <div className="card my-5">
            <div className="card-body">
              <div className="d-flex justify-content-center mt-5 mb-2"></div>
              <p className="card-title text-center my-0 fs-4">Sign in</p>
              <p className="card-title text-center mb-4 fs-6">
                Use your IMDB Clone Account
              </p>
              <form onSubmit={handleSubmit}>
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
                <div className="mb-3 mx-1">
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    minLength="6"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <br />
                <div className="text-center">
                  <input
                    className="btn my-3 login_button"
                    type="submit"
                    value="Sign in"
                  />
                </div>
                <div className="text-center mb-3 ">
                  <a href="/register" className="btn login_button">
                    Create an account
                  </a>
                </div>
                <div className="text-center">
                  <a href="/forgot_password" className="fp_link">
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
