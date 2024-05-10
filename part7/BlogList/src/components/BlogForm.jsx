import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/NotificationReducer";
import blogService from "../services/blogs";
import { addBlog } from "../reducers/BlogReducer";
import { Button, Input } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const blog = await blogService.createBlog(
      { title, author, url },
      user.token,
    );
    dispatch(setNotification(`A new blog: ${title} by ${author} added`));
    dispatch(addBlog(blog));
    setTimeout(() => {
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(clearNotification());
    }, 4000);
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button variant="outlined" type="submit">
        create
      </Button>
    </form>
  );
};

export default BlogForm;
