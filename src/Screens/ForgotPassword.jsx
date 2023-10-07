import { Button, Snackbar, TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import pizzaicon from "../assets/pizza_mania.png";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../Config/api";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState("");
  const [data, setData] = useState({
    email: "",
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let value=data;
    try {
      const {data,status} = await axios.post(`${url}/user/forgotpassword`,value);
      if (status === 200) {
        localStorage.setItem("resetAuth",data.data.token);
        navigate("/forpass-otp-confirm");
        setOpen(true);
        setDatas(data.data.message)
      }
    } catch (error) {
      console.log(error);
      setOpen(true);
      setDatas(error.response.data.data)
    }
  };

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
      <Container sx={{ boxShadow: 5, bgcolor: "white" }} maxWidth="xs">
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
          <Typography component="h1" variant="h4">
            Password assistance
          </Typography>
          <br />
          <Typography component="h1">
            Enter the email address associated with your Pizza Site.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
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
      <Stack sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {datas}
          </Alert>
        </Snackbar>
      </Stack>

    </>
  );
};

export default ForgotPassword;
