import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setNewBlog }) => {
  const [visible, setVisible] = useState(false)
  const handleAddLike = async () => {
    await blogService.likeBlog(blog, user.token)
    setNewBlog(true)
    setTimeout(() => setNewBlog(false), 4000)
  }
  const handleDelete = async (id) => {
    if (blog.author !== user.name) {
      alert('You don\'t have permission to delete this blog.')
      return
    }
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(id, user.token)
      setNewBlog(true)
      setTimeout(() => setNewBlog(false), 4000)
    }
  }

  return (
    <div style={{ border: '1px solid black', padding: 5, margin: 5 }}>
      {blog.title} - {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>

      {
        visible &&
        <div className='hiden'>
          <p className='url'>{blog.url}</p>
          <p className='likes'>Likes {blog.likes} <button onClick={ handleAddLike }>like</button> </p>
          <p>{blog.author}</p>
          {blog.author === user.name && <button onClick={() => handleDelete(blog.id) }>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog