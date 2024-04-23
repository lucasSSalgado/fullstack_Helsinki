import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ newBlog, setNewBlog, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [successBlog, setSuccessBlog] = useState(false)

    const handleCreate = async (event) => {
        event.preventDefault()
        await blogService.createBlog({title, author, url}, user.token)
        setNewBlog(!newBlog)
        setSuccessBlog(true)
        setTimeout(() => {
          setTitle('')
          setAuthor('')
          setUrl('')
          setNewBlog(!newBlog)
          setSuccessBlog(false)
        }, 4000)
    }

    return(
        <form onSubmit={handleCreate}>
            {
                successBlog && 
                <div style={{color: 'green', border: '1px solid green', padding: '5px', borderRadius: '5px'}}>
                A new blog: {title} by {author} added
                </div>
            }
            <div>title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div>author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
            <div>url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm