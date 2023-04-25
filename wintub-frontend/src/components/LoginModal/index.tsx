import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOffSharp, VisibilitySharp } from "@mui/icons-material";
import axios from "axios";
import { Form, Formik } from "formik";
import { baseURL } from "../../api";
import { IUserValues } from "../../constants/types";

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

const LoginModal = ({
  setIsUser,
}: {
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values: IUserValues) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email: values.email,
        password: values.password,
      });
      console.log(data);
      if (data.error) {
        alert(data.error.message);
        return;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          email: data.result.email,
          role: data.result.role,
        })
      );

      setIsUser(true);
    } catch (error) {
      console.log(error);
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
    <Modal
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleBlur, handleChange, errors, touched, values }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  value={values.email}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
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
                <Button type="submit" variant="contained">
                  confirm
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default LoginModal;
