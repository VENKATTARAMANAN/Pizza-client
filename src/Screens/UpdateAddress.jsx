import React, { useState } from "react";
import Navbar from "../Components/Navbars";
import { Button, Snackbar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/system";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as yup from "yup";
import { url } from "../Config/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fieldValidationSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  phone: yup
    .string()
    .required("Please fill this field")
    .length(10, "Please enter 10digit number"),
  altphone: yup.string().length(10, "Please enter 10digit number"),
  houseno: yup.string().required("Please fill this field"),
  street: yup
    .string()
    .required("Please fill this field")
    .max(100, "Max 100 words allowed"),
  landmark: yup.string().max(100, "Max 100 words allowed"),
  city: yup
    .string()
    .required("Please fill this field")
    .max(100, "Max 100 words allowed"),
  state: yup
    .string()
    .required("Please fill this field")
    .max(100, "Max 100 words allowed"),
  pincode: yup
    .string()
    .required("Please enter this field")
    .max(6, "Please enter the 6digit pincode"),
  country: yup
    .string()
    .required("Please fill this field")
    .max(100, "Max 100 words allowed"),
});

const UpdateAddress = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
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
      validationSchema:fieldValidationSchema,
      onSubmit: async () => {
        setOpen(true);
        try {
          const response = await axios.post(
            `${url}/address/updateaddress`,
            values,
            {
              headers: {
                Authorization: localStorage.getItem("AuthToken"),
              },
            }
          );
          setData(response.data.data);
          setTimeout(() => {
            navigate("/ordersummary");
          }, 1000);
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

  return (
    <Navbar>
      {false}
      <div className="address-container">
        <div className="address">
          <div className="address-header">
            <h3>Change Address</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="address-details">
              <TextField
                id="address-name"
                label="Name"
                variant="outlined"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <span className="errrorText">{errors.name}</span>
              ) : (
                <></>
              )}

              <TextField
                id="address-phone"
                label="Phone"
                type="number"
                variant="outlined"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone ? (
                <span className="errrorText">{errors.phone}</span>
              ) : (
                <></>
              )}

              <TextField
              
                id="address-altphone"
                label="Alternative Phone"
                type="number"
                variant="outlined"
                name="altphone"
                value={values.altphone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.altphone && touched.altphone ? (
                <span className="errrorText">{errors.altphone}</span>
              ) : (
                <></>
              )}

              <TextField
                
                id="address-houseno"
                label="House/Flat No"
                variant="outlined"
                type="number"
                name="houseno"
                value={values.houseno}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.houseno && touched.houseno ? (
                <span className="errrorText">{errors.houseno}</span>
              ) : (
                <></>
              )}

              <TextField
               
                id="address-street"
                label="Road/Street Name"
                variant="outlined"
                name="street"
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.street && touched.street ? (
                <span className="errrorText">{errors.street}</span>
              ) : (
                <></>
              )}

              <TextField
                id="address-landmark"
                label="Landmark(optional)"
                variant="outlined"
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.landmark && touched.landmark ? (
                <span className="errrorText">{errors.landmark}</span>
              ) : (
                <></>
              )}

              <TextField
              
                id="address-city"
                label="City"
                variant="outlined"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.city && touched.city ? (
                <span className="errrorText">{errors.city}</span>
              ) : (
                <></>
              )}

              <TextField
             
                id="address-state"
                label="State"
                variant="outlined"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.state && touched.state ? (
                <span className="errrorText">{errors.state}</span>
              ) : (
                <></>
              )}

              <TextField
             
                type="number"
                id="address-pincode"
                label="Pincode"
                variant="outlined"
                name="pincode"
                value={values.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.pincode && touched.pincode ? (
                <span className="errrorText">{errors.pincode}</span>
              ) : (
                <></>
              )}

              <TextField
          
                id="address-country"
                label="Country"
                variant="outlined"
                name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.country && touched.country ? (
                <span className="errrorText">{errors.country}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="address-button">
              <Button
                type="submit"
                style={{
                  backgroundColor: "rgb(251, 197, 60)",
                  color: "#000",
                  fontWeight: "bold",
                  marginBottom:15,
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
        <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </Navbar>
  );
};

export default UpdateAddress;
