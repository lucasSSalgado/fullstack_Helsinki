import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = (token) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(token);
    dispatch(setBlogs(blogs));
  };
};

export const { setBlogs, addBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
