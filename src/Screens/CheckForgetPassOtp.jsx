import { Button, TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import pizzaicon from "../assets/pizza_mania.png";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../Config/api";

const CheckForgetPassOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    random_string: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);
    try {
      const response = await axios.post(
        `${url}/user/otp-confirm`,
        otp
      );
      if (response.status === 200) {
        navigate("/changepassword");
      }
    } catch (error) {
     console.log(error);
    }
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
      <Container sx={{ boxShadow: 5 ,bgcolor:"white"}} maxWidth="xs">
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
            Verification required
          </Typography>
          <Typography>
            To continue, complete this verification step. We've sent an "Capcha Code" to
            your email. Please enter it below to
            complete verification.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Capcha Code"
              type="text"
              value={otp.email}
              onChange={(e) =>
                setOtp({ ...otp, random_string: e.target.value })
              }
            />
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

export default CheckForgetPassOtp;
