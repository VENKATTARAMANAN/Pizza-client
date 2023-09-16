import React from "react";
import Navbar from "../Components/Navbars";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Address = () => {
    const navigate=useNavigate();
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
    },
    onSubmit: () => {
        console.log(values);
        navigate("/payment")
    },
  });
  return (
    <Navbar>
      {false}
      <div className="address-container">
        <div className="address">
          <div className="address-header">
            <h2>Delivery Address</h2>
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
              required
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
                color: "rgb(213, 5, 5)",
              }}
              sx={{ width: 140 }}
              >
                continue
            </Button>
          </div>
          </form>
        </div>
      </div>
    </Navbar>
  );
};

export default Address;
