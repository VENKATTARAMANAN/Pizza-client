import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import pizzaicon from "../assets/pizza_mania.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { ref } from "yup";
import axios from "axios";
import { url } from "../Config/api";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fieldValidationSchema = yup.object({
  password: yup.string().min(8, "enter 8 digit password"),
  conf_pass: yup
    .string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "password does not match"),
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const { handleSubmit, values, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        conf_pass: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async(values) => {
        try {
          const pass = values.password;
          const token=localStorage.getItem("resetAuth")
         const {data,status}=await axios.put(`${url}/user/change-password`,{token,pass})
         if(status === 200){
          setOpen(true)
          setData(data.data.data)
          localStorage.removeItem("resetAuth");
          navigate('/')
         }
        } catch (error) {
            console.log(error);
            setOpen(true)
            setData(error.response.data.data)
        }
      },
    });

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, width: 100, height: 100 }} src={pizzaicon} />
      </Box>
      <Container sx={{ boxShadow: 5 ,bgcolor:"white"}} component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span style={{ color: "crimson" }}>{errors.password}</span>
            <TextField
              margin="normal"
              fullWidth
              name="conf_pass"
              label="Confirm Password"
              type="password"
              id="conf_pass"
              value={values.conf_pass}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span style={{ color: "crimson" }}>{errors.conf_pass}</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password & Sign In
            </Button>
          </form>
        </Box>
      </Container>
      <Stack sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
