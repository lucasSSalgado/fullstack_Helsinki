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

const likeBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const blogWithouUser = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
  }
  const resp = await axios.put(`${baseUrl}/${blog.id}`, blogWithouUser, config)
  return resp.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res
}

export default { getAll, login, createBlog, likeBlog, deleteBlog }