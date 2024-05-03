import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { 
        id: getId(),
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`,  { 
        id: anecdote.id,
        content: anecdote.content,
        votes: anecdote.votes + 1
    })
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

export default { getAll, createNew, update }