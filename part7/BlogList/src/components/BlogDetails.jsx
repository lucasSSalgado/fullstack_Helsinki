import { useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import blogsService from "../services/blogs";
import { setBlogs } from "../reducers/BlogReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeBlog } from "../reducers/BlogReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/NotificationReducer";
import { Typography, Button, TextField } from "@mui/material";

const BlogDetails = () => {
  const [comment, setComment] = useState("");
  const [reFetch, setReFetch] = useState(false);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddLike = async () => {
    await blogsService.likeBlog(blog, user.token);
    dispatch(setNotification(`liked blog: ${blog.title}`));
    setReFetch(!reFetch);
    setTimeout(() => dispatch(clearNotification()), 4000);
  };

  const handleDelete = async (id) => {
    if (blog.author !== user.name) {
      alert("You don't have permission to delete this blog.");
      return;
    }

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogsService.deleteBlog(id, user.token);
      dispatch(removeBlog(id));
      dispatch(setNotification(`deleted blog: ${blog.title}`));
      setTimeout(() => dispatch(clearNotification()), 4000);
      navigate("/");
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    const newComment = { comment };
    await blogsService.addComment(blog.id, newComment, user.token);
    setComment("");
    setReFetch(!reFetch);
  };

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogsService.getAll(user.token);
      dispatch(setBlogs(blogs));
    };
    getBlogs();
  }, [reFetch]);

  return (
    <div>
      {blog && (
        <div style={{ marginTop: 10 }}>
          <Typography>
            {blog.title} - {blog.author}
          </Typography>
          <p className="url">{blog.url}</p>
          <p className="likes">
            Likes {blog.likes}{" "}
            <Button variant="outlined" onClick={handleAddLike}>
              like
            </Button>{" "}
          </p>
          <p>added by: {blog.author}</p>
          {blog.author === user.name && (
            <Button variant="outlined" onClick={() => handleDelete(blog.id)}>
              remove
            </Button>
          )}

          <h3>Comments</h3>
          <form onSubmit={handleAddComment}>
            <TextField
              variant="standard"
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="outlined" type="submit">
              add
            </Button>
          </form>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
