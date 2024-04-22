import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  const request = await axios.get(baseUrl, { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  })
  return request.data
}

const login = async (credentials) => {
  const request = await axios.post('/api/login', credentials)
  return request.data
}

const createBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, login, createBlog }