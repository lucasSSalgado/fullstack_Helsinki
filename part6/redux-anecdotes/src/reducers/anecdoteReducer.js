import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    like(state, action) {
      const anecdote = state.find(n => n.id === action.payload)
      if (anecdote) {
        anecdote.votes++
      }
    },
    create(state, action) {
      state.push(asObject(action.payload))
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnectodes = () => {
  return async dispatch => {
    const notes = await anecdotesService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdotesService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const likeAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdotesService.update(content)
    dispatch(like(newNote.id))
  }
}

export const { like, create, setAnecdotes, appendNote } = anecdotesSlice.actions

export default anecdotesSlice.reducer