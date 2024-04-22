import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(false)	
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successBlog, setSuccessBlog] = useState(false)
  const [erroLogin, setErroLogin] = useState(false)

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
  const handleCreate = async (event) => {
    event.preventDefault()
    await blogService.createBlog({title, author, url}, user.token)
    setNewBlog(!newBlog)
    setSuccessBlog(true)
    setTimeout(() => {
      setSuccessBlog(false)
      setTitle('')
      setAuthor('')
      setUrl('')
    }, 4000)
  }

  useEffect(() => {
    const getAllB = async () => {
      const blogs = await blogService.getAll(user.token)
      setBlogs(blogs)
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
      {
        successBlog && 
        <div style={{color: 'green', border: '1px solid green', padding: '5px', borderRadius: '5px'}}>
          A new blog: {title} by {author} added
        </div>
      }
      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>
      <form onSubmit={handleCreate}>
        <div>title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div>author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
        <div>url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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