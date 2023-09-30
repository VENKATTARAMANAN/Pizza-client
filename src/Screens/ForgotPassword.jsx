import { Button, TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import pizzaicon from "../assets/pizza_mania.png";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate=useNavigate();
  const [data,setData]=useState({
    email:""
  })
  const handleSubmit=async(e)=>{
e.preventDefault();
try {
  const response=await axios.post("http://localhost:9000/user/forgotpassword",data)
console.log(response.data);
if(response){
  localStorage.setItem("resetAuth",response.data.data.token)
  navigate('/forpass-otp-confirm')
}
} catch (error) {
  alert(error.response?.data?.data)
}

  }
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
      <Container sx={{ boxShadow: 5 ,bgcolor:"white"}} maxWidth="xs">
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height:"50vh"
          }}
        >
          <Typography component="h1" variant="h4">
          Password assistance
          </Typography>
          <br/>
          <Typography component="h1">
          Enter the email address associated with your Pizza Site.
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField margin="normal" fullWidth label="Email" type="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;
