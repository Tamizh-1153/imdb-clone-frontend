import React from "react"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "../api/posts"
import { toast } from "react-toastify"

const ForgotPassword = () => {
  const { mutate } = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: (data) => {
      if (data.resetLink) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value

    mutate(email)
  }

  return (
    <div  data-bs-theme="dark">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-5">
          <div className="card my-5">
            <div className="card-body">
              <div className="d-flex justify-content-center mt-5 mb-2"></div>
              <p className="card-title text-center  fs-4">Account recovery</p>
              <p className="card-title text-center mb-4 fs-6">
                Enter your email that you want to recover
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mx-1">
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="text-center">
                  <button className="btn login_button my-3" type="submit">
                    Send reset link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
