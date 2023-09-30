import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import pizzadata from "../pizassdata";
import Navbar from "../Components/Navbars";

import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  OutlinedInput,
  NativeSelect,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ADD_TO_CART } from "../Redux/Slices/pizzaSlice";
import { useDispatch } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, vegTopping, theme) {
  return {
    fontWeight:
      vegTopping.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getStylings(nonVegTopping, name, theme) {
  return {
    fontWeight:
      nonVegTopping.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CustomizePizza = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [vegTopping, setVegTopping] = useState([]);
  const [nonVegTopping, setNonVegTopping] = useState([]);
  const [pizzaPrice, setPizzaPrice] = useState(0);
  const [extraNonvegPrice, setExtraNonvegPrice] = useState(0);
  const [extraVegPrice, setExtraVegPrice] = useState(0);
  const [response, setResponse] = useState({});
  const { id } = useParams();
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      selectsize:"regular",
      pizzabase:"Cheese_Burst",
      sauce: "BBQ_Sauce",
      cheese: "Cheddar_Cheese",
      vegtoppings: [],
      nonvegtoppings: [],
      price: 0,
      name:"",
      image:"",
      quantity:1,
      customize: "customized pizza",
      auth: localStorage.getItem("AuthToken"),
    },
    onSubmit: async (values) => {
      try {
        values.price = pizzaPrice + extraVegPrice + extraNonvegPrice;
        values.nonvegtoppings = nonVegTopping;
        values.vegtoppings = vegTopping;
        values.name=response.name;
        values.image=response.image;
        const { data } = await axios.put(
          "http://localhost:9000/cart/addtocart",
          values,
          {
            headers: {
              Authorization: localStorage.getItem("AuthToken"),
            },
          }
        );
        dispatch(ADD_TO_CART([values]));
        navigate("/cartpage")
      } catch (error) {
        console.log(error);
      }
  
    },
  });

  const getData = async () => {
    try {
      const responses = await axios.get(`http://localhost:9000/pizza/${id}`, {
        headers: {
          Authorization: localStorage.getItem("AuthToken"),
        },
      });
      setResponse(responses.data.data);
      setPizzaPrice(responses.data.data?.prices[0]?.regular);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(Object.keys(response).length > 0) {
      setPizzaPrice(response?.prices[0][values.selectsize]);
    }
  },[values.selectsize])

  const theme = useTheme();

  const handleVegTopping = (value) => {
    if (value.length > 3) {
      setExtraVegPrice((value.length - 3) * 50);
    } else if (value.length === 3) {
      setExtraVegPrice(0);
    }
    setVegTopping(value);
  };

  const handleNonVegTopping = (value) => {
    if (value.length > 1) {
      setExtraNonvegPrice((value.length - 1) * 75);
    } else if (value.length === 1) {
      setExtraNonvegPrice(
        extraNonvegPrice === 75 ? extraNonvegPrice - 75 : extraNonvegPrice
      );
    }
    setNonVegTopping(value);
  };

   return (
    <Navbar>
      {true},
      <div className="customize-container">
        <div className="customize-card">
          <div className="card-left">
            <img src={response.image} alt="logo" />
          </div>
          <div className="card-right">
            <h2>{response.name}</h2>
            <p>{response.description}</p>
            <br />
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="radio-button">
                <br />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="select-size">Select Size</InputLabel>
                    <NativeSelect
                      id="select-size"
                      name="selectsize"
                      value={values?.selectsize}
                      onChange={handleChange}
                      label="Select Size"
                      onBlur={handleBlur}
                    >
                      {response?.varients?.map((data, i) => (
                        <option key={i} value={data}>
                          {data}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
                {
                  errors.selectsize && touched.selectsize ? <span style={{ color: "crimson" }}>{errors.selectsize}</span> : <></>
                }
                <br />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="select-pizzabase">
                      Select PizzaBase
                    </InputLabel>
                    <NativeSelect
                      id="select-pizzabase"
                      name="pizzabase"
                      value={values?.pizzabase}
                      onChange={handleChange}
                      label="Select PizzaBase"
                      onBlur={handleBlur}
                    >
                      {response?.pizzabase?.map((data, i) => (
                        <option key={i} value={data}>
                          {data}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
               {
                errors.pizzabase && touched.pizzabase ?  <span style={{ color: "crimson" }}>{errors.pizzabase}</span> : <></>
               }

                <br />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="select-sauce">Select sauce</InputLabel>
                    <NativeSelect
                      id="select-sauce"
                      name="sauce"
                      value={values?.sauce}
                      onChange={handleChange}
                      label="Select sauce"
                    >
                      {response?.sauce?.map((data, i) => (
                        <option key={i} value={data}>
                          {data}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
                <span style={{ color: "crimson" }}>{errors.sauce}</span>
                <br />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="select-cheese">Select cheese</InputLabel>
                    <NativeSelect
                      id="select-cheese"
                      name="cheese"
                      value={values?.cheese}
                      onChange={handleChange}
                      label="Select cheese"
                    >
                      {response?.cheese?.map((data, i) => (
                        <option key={i} value={data}>
                          {data}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
                <span style={{ color: "crimson" }}>{errors.cheese}</span>
                <br />
                <Typography>Select Three free veggies </Typography>
                <Typography>
                  Note:Adding Extra veggies cost each RS:50
                </Typography>
                <br />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-chip-label">
                      Select vegtoppings
                    </InputLabel>
                    <Select
                      label="Select vegtoppings"
                      id="demo-multiple-chip"
                      multiple
                      name="vegtoppings"
                      value={vegTopping}
                      onChange={(e) => handleVegTopping(e.target.value)}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {response?.vegtoppings?.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, vegTopping, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {
                  errors.vegtoppings ? <span style={{ color: "crimson" }}>{errors.vegtoppings}</span> : <></>
                }
                <br />
                <div>
                  <Typography>Select One free Meat</Typography>
                  <Typography>
                    Note:Adding Extra Meat Each cost RS:75
                  </Typography>
                  <br />
                  <FormControl fullWidth>
                    <InputLabel id="select-nonveg-topping">
                      Select Non-Vegtoppings
                    </InputLabel>
                    <Select
                      id="select-nonveg"
                      label="Select Non-Vegtoppings"
                      multiple
                      name="nonVegTopping"
                      value={nonVegTopping}
                      onChange={(e) => handleNonVegTopping(e.target.value)}
                      input={
                        <OutlinedInput
                          id="select-multiple-chips"
                          label="Chips"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {response?.nonvegtoppings?.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStylings(name, nonVegTopping, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <span style={{ color: "crimson" }}>
                  {errors.nonvegtoppings}
                </span>
                <br />
                <div className="quantity">
                  <span>
                    Price:
                    {pizzaPrice + extraVegPrice + extraNonvegPrice}
                  </span>
                </div>
                <br />
                <div className="addtocart">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "rgb(251, 197, 60)",
                      color: "#000",
                      fontWeight:"bold"
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </form>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default CustomizePizza;
