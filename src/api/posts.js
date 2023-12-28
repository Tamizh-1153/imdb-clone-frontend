import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASEURL}/api/v1`,
})

export const getUserInfo = async () => {
  try {
    const response = await api.get("/user/info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error("Error getting user info")
    throw error
  }
}

export const createUser = async ({ name, email, password }) => {
  try {
    const res = await api.post("/register", { name, email, password })
    return res.data
  } catch (error) {
    toast.error("Error registering user")
    throw error
  }
}

export const userLogin = async ({ email, password }) => {
  try {
    const res = await api.post("/login", { email, password })
    return res.data
  } catch (error) {
    toast.error("Error Logging in")
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const res = await api.post("/forgot_password", { email })
    return res.data
  } catch (error) {
    toast.error("Error sending password reset link")
    throw error
  }
}

export const resetPassword = async ({ id, token, password }) => {
  try {
    const res = await api.post(`/reset_password/${id}/${token}`, {
      password,
    })
    return res.data
  } catch (error) {
    toast.error("Error updating password")
    throw error
  }
}

export const addProducerToServer = async (producerDetails) => {
  try {
    const res = await api.post(
      "/producers/add",
      { producerDetails },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const addActorToServer = async (actorDetails) => {
  try {
    const res = await api.post(
      "/actors/add",
      { actorDetails },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const addMovieToServer = async(movieDetails) => {
  try {
    const res = await api.post(
      "/movies/add",
      { movieDetails },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const updateMovieToServer = async (id,movieDetails) => {
  try {
    const res = await api.put(
      `/movies/edit/${id}`,
      { movieDetails },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllActors = async () => {
  try {
    const response = await api.get("/actors/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllProducers = async () => {
  try {
    const response = await api.get("/producers/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllMovies = async () => {
  try {
    const response = await api.get("/movies/all")
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteMovie = async (id) => {
  try {
    const res = await api.delete(
      `/movies/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have at least three characters"
    : null
}

export const validateParagraph = (value) => {
  return value?.length < 20 || value === null
    ? "Must have at least 20 characters"
    : null
}

export const validateGender = (value) => {
  return value === "Male" || value === "Female" ? null : "Select a gender"
}
