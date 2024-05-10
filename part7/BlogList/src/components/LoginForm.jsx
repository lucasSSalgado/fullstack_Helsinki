import Notification from "./Notification";
import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/NotificationReducer";
import { setUser } from "../reducers/UserReducer";
import { Typography, Input, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      setUsername("");
      setPassword("");
      dispatch(setNotification("wrong username or password"));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 4000);
    }
  };

  return (
    <div>
      <Typography variant="h3">Log in to application</Typography>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username:
          <Input
            variant="standard"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:
          <Input
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="outlined" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
