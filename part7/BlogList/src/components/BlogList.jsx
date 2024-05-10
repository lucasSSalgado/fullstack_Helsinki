import Blog from "./Blog";
import Togglable from "./Togglable";
import Notification from "./Notification";
import BlogForm from "./BlogForm";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeBlogs } from "../reducers/BlogReducer";

import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs(user.token));
  }, []);

  return (
    <div>
      <Typography variant="h3" mt={3}>
        Blogs
      </Typography>
      <Notification />
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <TableContainer>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog blog={blog} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
