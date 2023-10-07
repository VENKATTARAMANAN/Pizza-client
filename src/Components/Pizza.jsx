import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/Slices/pizzaSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { url } from "../Config/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Pizza = ({ pizza, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  var { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      selectsize: "regular",
      price: "",
      name: pizza.name,
      image: pizza.image,
      auth: localStorage.getItem("AuthToken"),
      pizzaid: pizza._id,
      quantity: 1,
    },
    onSubmit: async () => {
      try {
        const { data, status } = await axios.put(
          `${url}/cart/addtocart`,
          values,
          {
            headers: {
              authorization: localStorage.getItem("AuthToken"),
            },
          }
        );
        if (status === 200) {
          setOpen(true);
          dispatch(ADD_TO_CART([values]));
          setData(data.data);
        }
      } catch (error) {
        setData(error.response.data.data);
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

  values = { ...values, price: pizza.prices[0][values.selectsize] };
  return (
    <>
      {pizza.stock > 0 ? (
        <div key={index}>
          <div className="card">
            <img
              src={pizza.image}
              alt="Avatar"
              style={{ width: "100%", height: "200px", cursor: "pointer" }}
              onClick={() => navigate(`/customizepizza/${pizza._id}`)}
            />
            <div className="card-container">
              <p className="title">
                <b>{pizza.name}</b>
              </p>
              <div className="description">
                {" "}
                <p>{pizza.description}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <span>
                  <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="select-size">Select Size</InputLabel>
                    <Select
                      id="select-size"
                      name="selectsize"
                      required
                      value={values.selectsize}
                      onChange={handleChange}
                      label="Select Size"
                    >
                      {pizza?.varients?.map((data, i) => (
                        <MenuItem key={i} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </span>
                <div className="home-addtocart">
                  <div>
                    <Typography
                      style={{ fontSize: "20px" }}
                      value={values.price}
                      onChange={handleChange}
                    >
                      {" "}
                      Price:{values.price}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      size="small"
                      type="submit"
                      style={{
                        backgroundColor: "rgb(251, 197, 60)",
                        color: "#000",
                        fontWeight: "bold",
                      }}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Stack sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert severity="success" sx={{ width: "100%" }}>
                {data}
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      ) : (
        <div key={index}>
          <div className="outofstock-card">
            <img
              src={pizza.image}
              alt="Avatar"
              style={{ width: "100%", height: "200px", cursor: "pointer" }}
            />
            <div className="card-container">
              <p className="title">
                <b>{pizza.name}</b>
              </p>
              <div className="description">
                {" "}
                <p>{pizza.description}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <span>
                  <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="select-size">Select Size</InputLabel>
                    <Select
                      id="select-size"
                      name="selectsize"
                      required
                      value={values.selectsize}
                      onChange={handleChange}
                      label="Select Size"
                    >
                      {pizza?.varients?.map((data, i) => (
                        <MenuItem key={i} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </span>
                <div className="home-addtocart">
                  <div>
                    <Typography
                      style={{ fontSize: "20px" }}
                      value={values.price}
                      onChange={handleChange}
                    >
                      {" "}
                      Price:{values.price}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      size="small"
                      type="submit"
                      style={{
                        backgroundColor: "rgb(251, 197, 60)",
                        color: "#000",
                        fontWeight: "bold",
                      }}
                      disabled
                    >
                      Out Of Stock
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pizza;
