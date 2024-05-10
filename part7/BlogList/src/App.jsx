import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/BlogReducer";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetails from "./components/BlogDetails";
import { setUser } from "./reducers/UserReducer";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Container } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const user = JSON.parse(localUser);
      dispatch(setUser(user));
    }

    if (user) {
      dispatch(initializeBlogs(user.token));
    }
  }, []);

  return (
    <>
      {user && <Navigation />}

      <Container>
        <Routes>
          <Route path="/" element={user ? <BlogList /> : <LoginForm />} />
          <Route path="/users" element={user ? <Users /> : <LoginForm />} />
          <Route path="/users/:id" element={user ? <User /> : <LoginForm />} />
          <Route
            path="/blogs/:id"
            element={user ? <BlogDetails /> : <LoginForm />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
