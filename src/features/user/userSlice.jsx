import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user:null,
    actors:null,
    producers:null,
    movies:null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      state.user = payload
    },
    removeUser: (state) => {
      state.user = null
    },
    addActors: (state,{payload}) => {
      state.actors=payload
    },
    addProducers: (state,{payload}) => {
      state.producers=payload
    },
    addMovies: (state,{payload}) => {
      state.movies = payload
    },
    addActor: (state,{payload}) => {
      state.actors.push(payload)
    },
    addProducer: (state,{payload}) => {
      state.producers.push(payload)
    },

  },
})

export const { updateUser, removeUser,addActors,addProducers,addMovies,addActor,addProducer } = userSlice.actions

export default userSlice.reducer