import * as React from "react";
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
import { useState } from "react";
import {
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import axios from "axios";
import { useEffect } from "react";

const fieldValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter valid Email")
    .required("Please Enter the Email"),
  password: yup.string().min(8, "Enter 8 digit password"),
});
export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleChange, values, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async(values) => {
       try {
        const response=await axios.post("http://localhost:9000/user/signin",values)
        if(response){
          localStorage.setItem("AuthToken",response.data.data.token)
          // navigate('/homepage')
        }
       } catch (error) {
        alert(error.response?.data?.data)
       }
      },
    });
    useEffect(()=>{
let token=localStorage.getItem("AuthToken")
if(token){
  navigate('/homepage')
}
    })
  return (
    <Container style={{backgroundColor: "#fff"}} sx={{ boxShadow: 5 }} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 7,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Avatar sx={{ m: 1, width: 100, height: 100 }} src={pizzaicon} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box sx={{ mt: 1 }}>
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
            <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <span style={{ color: "crimson" }}>{errors.password}</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link style={{cursor:"pointer"}} onClick={() => navigate("/forgotpassword")} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link  style={{cursor:"pointer"}} onClick={() => navigate("/signup")} variant="body2" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
