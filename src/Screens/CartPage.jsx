import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbars";
import axios from "axios";
import Lottie from "lottie-react";
import pizzadata from "../pizassdata";
import emptycart from "../assets/empty_cart.json";
import { Button, IconButton, Snackbar } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { url } from "../Config/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const cartArr = useSelector((state) => state.cartArr.cart);

  const getCartData = async () => {
    try {
      const token = localStorage.getItem("AuthToken");
      const { data } = await axios.post(
        `${url}/cart/showcartquantity`,
        { token },
        {
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        }
      );
      setCartData(data.data);
      let sum = 0;
      const val = data.data.map(
        (cartArr) => (sum += cartArr.quantity * cartArr.price)
      );
      setPrice(sum);
    } catch (error) {
      console.log(error);
      setOpen(true)
      setData(error.response.data.data)
    }
  };

  const subQuantity = async (e) => {
    try {
      const response = await axios.put(
        `${url}/cart/subqty`,
        {
          _id: e,
        },
        {
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        }
      );
      setOpen(true);
      getCartData();
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      setOpen(true)
      setData(error.response.data.data)
    }
  };
  const addQuantity = async (e) => {
    try {
      const response = await axios.put(
        `${url}/cart/addqty`,
        {
          _id: e,
        },
        {
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        }
      );
      setOpen(true);
      getCartData();
      setData(response.data.data);
    } catch (error) {
      setOpen(true);
      console.log(error);
      setData(error.response.data.data);
    }
  };

  const deleteCartPizza = async (e) => {
    try {
      const response = await axios.post(
        `${url}/cart/deletecartpizza`,
        { _id: e },
        {
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        }
      );
      setOpen(true);
      getCartData();
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      setOpen(true)
      setData(error.response.data.data)
    }
  };
  useEffect(() => {
    getCartData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Navbar>
      {false}
      {cartData?.length !== 0 ? (
        <div className="cart-container">
          <div className="carts-left">
            <div className="cart-left-header">
              <h3>CART ITEMS</h3>
            </div>
            {cartData.map((val, idx) => (
              <div key={idx} className="cart-dataes">
                <div className="cart-img">
                  <img src={val.image} alt="cart" />
                </div>
                <div className="cart-name">
                  <div>
                    {val.name}
                    <span>({val.selectsize})</span>
                  </div>
                  <span style={{ color: "brown" }}>{val.customize}</span>
                  <div className="edit-quantity">
                    Quantity:
                    <RemoveCircleIcon onClick={() => subQuantity(val._id)} />
                    {val.quantity}
                    <AddCircleIcon onClick={() => addQuantity(val._id)} />
                  </div>
                </div>
                <div className="cart-price">
                  <div>PRICE</div>
                  <div>{val.price * val.quantity}</div>
                </div>
                <div className="cart-delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteCartPizza(val._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-right">
            <div className="cart-right-header">
              <h3>PRICE DETAILS</h3>
            </div>

            <div className="price-details-body">
              <div className="price-details">
                <div>Price Items</div>
                <div>{price}</div>
              </div>
              <div className="discount">
                <div>Discount</div>
                <div style={{ color: "green" }}>Nil</div>
              </div>
              <div className="delivery-charge">
                <div>Delivery Charge</div>
                <div style={{ color: "green" }}>Nil</div>
              </div>
              <hr style={{ opacity: 0.4 }} />
              <div className="total">
                <div>Total Amount</div>
                <div>{price}</div>
              </div>
              <hr style={{ opacity: 0.4 }} />
              <div className="placeorder-btn">
                <Button
                  style={{
                    backgroundColor: "rgb(251, 197, 60)",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                  sx={{ width: 140 }}
                  onClick={() => navigate("/address")}
                >
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lottie-empty-cart">
          <Lottie
            style={{ height: "350px" }}
            animationData={emptycart}
            loop={true}
          />
          <Button
            onClick={() => navigate("/homepage")}
            style={{
              backgroundColor: "rgb(251, 197, 60)",
              color: "#000",
              fontWeight: "bold",
            }}
            sx={{ width: 140 }}
          >
            Shop Now
          </Button>
        </div>
      )}
      <Stack sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </Navbar>
  );
};

export default CartPage;
