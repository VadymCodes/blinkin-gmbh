import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import AddUser from "../../components/AddUser";
import { baseURL } from "../../api";
import { IUserDetails } from "../../constants/types";

interface IDashboard {
  setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<IDashboard> = ({ setOpenUser }) => {
  const [addUser] = useState(false);
  const [userData, setUserData] = useState<IUserDetails[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${baseURL}/users/`);
      console.log(data);
      setUserData(data);
    };
    getData();
    return;
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOpenUser(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const storage = JSON.parse(localStorage.getItem("user") as string);

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          p: 2,
          mt: 2,
          mb: 2,
          boxShadow: "none",
        }}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          gap={2}
          mb={4}
          flexDirection="row"
        >
          <Typography variant="h4">{storage?.email}</Typography>

          <Box display="flex" gap={1}>
            <Box>
              {storage?.role === "admin" && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setOpen(!open)}
                >
                  Add User
                </Button>
              )}
              {open && (
                <AddUser addUser={addUser} setAddUser={handleCloseModal} />
              )}
            </Box>
            <Box>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
        <TableContainer style={{ marginTop: "35px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((f, i) => (
                <TableRow key={i}>
                  <TableCell>{f.email}</TableCell>
                  <TableCell>{f.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Dashboard;
