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
import { url } from "../Config/api";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { Snackbar } from "@mui/material";
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fieldValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter valid Email")
    .required("Please enter the Email"),
  password: yup.string().required("Please enter the password").min(8, "enter 8 digit password"),
  conf_pass: yup
    .string()
    .required("Please enter your confirm-password")
    .oneOf([ref("password")], "password does not match"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const { handleSubmit, values, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        conf_pass: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async (values) => {
        const { conf_pass, ...rest } = values;
        try {
          const { data, status } = await axios.post(`${url}/user/signup`, rest);
          if (status === 200) {
            navigate("/signin");
            setOpen(true);
            setData(data.data.data);
          }
        } catch (error) {
          console.log(error);
          setOpen(true);
          setData(error.response.data.data);
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
    <Container
      sx={{ boxShadow: 5, bgcolor: "white" }}
      component="main"
      maxWidth="xs"
    >
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
          {errors.email && touched.email ? (
            <span style={{ color: "crimson" }}>{errors.email}</span>
          ) : (
            <></>
          )}
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
          {errors.password && touched.password ? (
            <span style={{ color: "crimson" }}>{errors.password}</span>
          ) : (
            <></>
          )}
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
          {errors.conf_pass && touched.conf_pass ? (
          <span style={{ color: "crimson" }}>{errors.conf_pass}</span>
          ) : (
            <></>
          )}
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
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signin")}
              variant="body2"
            >
              Already have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Stack sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
}
