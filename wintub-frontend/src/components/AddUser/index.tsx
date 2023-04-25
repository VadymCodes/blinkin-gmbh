import React, { useState } from "react";
import { VisibilityOffSharp, VisibilitySharp } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { baseURL } from "../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddUser = ({
  addUser,
  setAddUser,
}: {
  addUser: boolean;
  setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const handleSubmit = async (values: any) => {
    console.log(values);
    const storage = JSON.parse(localStorage.getItem("user") as string);
    try {
      const { data } = await axios.post(
        `${baseURL}/users/add`,
        {
          role: values.role,
          email: values.userEmail,
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${storage.token}`,
          },
        }
      );
      if (data.error) {
        alert(data.error.message);
        return;
      }
      console.log(data);
      window.location.reload();
      setAddUser(false);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        alert(error.response?.data);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((p) => !p);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div>
      <Modal open={!addUser} onClose={setAddUser}>
        <Box sx={style}>
          <Formik
            initialValues={{ userEmail: "", password: "", role: "" }}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, touched, errors, handleBlur, handleChange }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="UserEmail"
                    id="userEmail"
                    name="userEmail"
                    value={values.userEmail}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.userEmail && Boolean(errors.userEmail)}
                    helperText={touched.userEmail && errors.userEmail}
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      id="outlined-adornment-password"
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onMouseDown={handleMouseDownPassword}
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityOffSharp />
                            ) : (
                              <VisibilitySharp />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    ></OutlinedInput>
                  </FormControl>

                  <FormControl style={{ maxWidth: 400, width: "100%" }}>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      label="Role"
                      id="role"
                      name="role"
                      aria-describedby="select-class"
                      value={values.role}
                      onChange={handleChange}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button type="submit" variant="contained">
                    confirm
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default AddUser;
