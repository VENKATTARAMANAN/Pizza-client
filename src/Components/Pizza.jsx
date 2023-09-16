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
      quantity:1,
    },
    onSubmit: async () => {
      try {
        setOpen(true);
        const { data } = await axios.post(
          "http://localhost:9000/cart/addtocart",
          values,
          {
            headers: {
              Authorization: localStorage.getItem("AuthToken"),
            },
          }
        );
 
        setData(data.data);
        dispatch(ADD_TO_CART([values]));
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

  values = { ...values, price: pizza.prices[0][values.selectsize] };

  // const addToCart = (qty) => {
  //   let cartObj = { quantity:qty };
  //   delete cartObj.varients;
  //   delete cartObj.prices;
  //   cartObj.quantity = qty;
  //   cartObj.varint = vrnt;

  // };

  return (
    <div key={index}>
      <div className="card">
        <img
          src={pizza.image}
          alt="Avatar"
          style={{ width: "100%", height: "200px" }}
          onClick={() => navigate(`/customizepizza/${pizza._id}`)}
        />
        <div className="card-container">
          <p className="title">
            <b>{pizza.name}</b>
          </p>
          <p className="description">{pizza.description}</p>
          <form onSubmit={handleSubmit}>
            <span>
              <FormControl fullWidth>
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
                    color: "rgb(213, 5, 5)",
                  }}
                >
                  Add To Cart
                </Button>
              </div>
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
    </div>
  );
};

export default Pizza;
