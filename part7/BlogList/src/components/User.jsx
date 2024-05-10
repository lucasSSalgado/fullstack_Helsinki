import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/user";
import { setAllUser } from "../reducers/AllUsersReducer";
import { useMatch } from "react-router-dom";
import {
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  Table,
  TableCell,
} from "@mui/material";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const match = useMatch("/users/:id");

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await userService.getAllUsers();
      dispatch(setAllUser(users));
    };
    getAllUsers();
  }, []);

  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return (
    <>
      {user && (
        <>
          <Typography variant="h2">{user.name}</Typography>
          <Typography variant="h4">added blogs</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {user.blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default User;
