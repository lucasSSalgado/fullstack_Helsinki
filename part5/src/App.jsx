import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erroLogin, setErroLogin] = useState(false)
  const [newBlog, setNewBlog] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({username, password})
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setUsername('')
      setPassword('')
      setErroLogin(true)
      setTimeout(() => {
        setErroLogin(false)
      }, 4000)
    }
  }
  useEffect(() => {
    const getAllB = async () => {
      const blogs = await blogService.getAll(user.token)
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    getAllB() 
  }, [user, newBlog])
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      return
    }
  }, [])

  const LoginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {
        erroLogin && 
        <div style={{color: 'red', border: '1px solid red', padding: '5px', borderRadius: '5px'}}>
          Wrong credentials
        </div>
      }
      <form onSubmit={handleLogin}>
        <div>
          username: 
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password: 
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const BlogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm setNewBlog={setNewBlog} newBlog={newBlog} user={user}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} setNewBlog={setNewBlog}/>
      )}
    </div>
  )

  return (
    <div>
      {user === null && LoginForm()}
      {user !== null && BlogList()}
    </div>
  )
}

export default App