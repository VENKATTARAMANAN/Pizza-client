import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import pizzaicon from "../assets/pizza_mania.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { ref } from "yup";
import axios from "axios";

const fieldValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter valid Email")
    .required("Please enter the Email"),
  password: yup.string().min(8, "enter 8 digit password"),
  conf_pass: yup
    .string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "password does not match"),
});

export default function SignUp() {
  const navigate = useNavigate();

  const { handleSubmit, values, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        conf_pass: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async(values) => {
         const {conf_pass,...rest}=values;
try {
  const response=await axios.post("http://localhost:9000/user/signup",rest)
  if(response){
    navigate('/signin')
  }
} catch (error) {
alert(error.response?.data?.data)
}
      },
    });

  return (
    <Container sx={{ boxShadow: 5 }} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Avatar sx={{ m: 1, width: 100, height: 100 }} src={pizzaicon} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span style={{ color: "crimson" }}>{errors.email}</span>
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
            Sign In
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link onClick={() => navigate("/signin")} variant="body2">
              Already have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
