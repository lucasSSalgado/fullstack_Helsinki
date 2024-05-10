import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducers/UserReducer";
import { Button, Typography } from "@mui/material";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
  };

  return (
    <nav>
      <Link to="/">
        {" "}
        <Button variant="outlined">home</Button>
      </Link>
      <Link style={{ marginLeft: 10 }} to="/users">
        <Button variant="outlined">users</Button>
      </Link>
      <span style={{ marginLeft: 10 }}>
        <Typography>
          {user.name} logged in{" "}
          <Button variant="outlined" onClick={handleLogout}>
            logout
          </Button>
        </Typography>
      </span>
    </nav>
  );
};

export default Navigation;
