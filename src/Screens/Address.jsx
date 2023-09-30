import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbars";
import { useFormik } from "formik";
import { Button, Snackbar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/system";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Address = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      altphone: "",
      houseno: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      userid: localStorage.getItem("AuthToken"),
    },
    onSubmit: async () => {
      setOpen(true);
      try {
        const response = await axios.post(
          "http://localhost:9000/address/addaddress",
          values,{
            headers:{
              Authorization:localStorage.getItem("AuthToken")
            }
          }
        );
        setData(response.data.data);
        navigate("/ordersummary");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addressData = async () => {
    try {
      const token = localStorage.getItem("AuthToken");
      const response = await axios.post(
        "http://localhost:9000/address/getaddress",
        { token: token },{
          headers:{
            Authorization:localStorage.getItem("AuthToken")
          }
        }
      );
      if (response.data.data) {
        navigate("/ordersummary");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addressData();
  },[]);

  return (
    <Navbar>
      {false}
      <div className="address-container">
        <div className="address">
          <div className="address-header">
            <h3>Delivery Address</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="address-details">
              <TextField
                required
                id="address-name"
                label="Name"
                variant="outlined"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <TextField
                required
                id="address-phone"
                label="Phone"
                type="number"
                variant="outlined"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
              <TextField
                id="address-altphone"
                label="Alternative Phone"
                type="number"
                variant="outlined"
                name="altphone"
                value={values.altphone}
                onChange={handleChange}
              />
              <TextField
                required
                id="address-houseno"
                label="House/Flat No"
                variant="outlined"
                type="number"
                name="houseno"
                value={values.houseno}
                onChange={handleChange}
              />
              <TextField
                required
                id="address-street"
                label="Road/Street Name"
                variant="outlined"
                name="street"
                value={values.street}
                onChange={handleChange}
              />
              <TextField
                id="address-landmark"
                label="Landmark(optional)"
                variant="outlined"
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
              />
              <TextField
                required
                id="address-city"
                label="City"
                variant="outlined"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
              <TextField
                required
                id="address-state"
                label="State"
                variant="outlined"
                name="state"
                value={values.state}
                onChange={handleChange}
              />
              <TextField
                required
                type="number"
                id="address-pincode"
                label="Pincode"
                variant="outlined"
                name="pincode"
                value={values.pincode}
                onChange={handleChange}
              />
              <TextField
                required
                id="address-country"
                label="Country"
                variant="outlined"
                name="country"
                value={values.country}
                onChange={handleChange}
              />
            </div>
            <div className="address-button">
              <Button
                type="submit"
                style={{
                  backgroundColor: "rgb(251, 197, 60)",
                  color: "#000",
                  fontWeight:"bold"
                }}
                sx={{ width: 140 }}
              >
                continue
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </Navbar>
  );
};

export default Address;
