import { useEffect } from "react";
import userService from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import { setAllUser } from "../reducers/AllUsersReducer";
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

const Users = () => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await userService.getAllUsers();
      dispatch(setAllUser(users));
    };
    getAllUsers();
  }, []);

  return (
    <>
      <Typography variant="h3" mt={3}>
        Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <th>
                <Typography variant="h5">name</Typography>
              </th>
              <th>
                <Typography variant="h5">blogs created</Typography>
              </th>
            </tr>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell style={{ border: "1px solid black" }}>
                      <a href={`/users/${user.id}`}>{user.name}</a>
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid black", textAlign: "center" }}
                    >
                      {user.blogs.length}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
