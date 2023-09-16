import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbars";
import axios from "axios";
import Lottie from "lottie-react";
import pizzadata from "../pizassdata";
import emptycart from "../assets/empty_cart.json";
import { Button, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate=useNavigate();
  const [cartData, setCartData] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const cartArr = useSelector((state) => state.cartArr.cart);
  // console.log(cartData);
  // let sum=0
  //   const val=cartArr.map((cartArr)=>(
  //     sum+=cartArr.quantity
  //   ))
  const getCartData = async () => {
    try {
      const token = localStorage.getItem("AuthToken");
      const { data } = await axios.post(
        "http://localhost:9000/cart/showcartquantity",
        { token },{
        headers: {
          Authorization: localStorage.getItem("AuthToken"),
        },}
      );
      setCartData(data.data);
      let sum = 0;
      const val = data.data.map(
        (cartArr) => (sum += cartArr.quantity * cartArr.price)
      );
      setPrice(sum);
    } catch (error) {
      console.log(error);
    }
  };

  const subQuantity = async (e) => {
    try {
      const response = await axios.post("http://localhost:9000/cart/subqty", {
        _id: e,
      },{
        headers: {
          Authorization: localStorage.getItem("AuthToken"),
        },
      });
      getCartData();
    } catch (error) {
      console.log(error);
    }
    
  };
  const addQuantity = async (e) => {
    try {
      const response = await axios.post("http://localhost:9000/cart/addqty", {
        _id: e,
      },{
        headers: {
          Authorization: localStorage.getItem("AuthToken"),
        },
      });
      getCartData();
    } catch (error) {
      console.log(error);
    }
    
  };

  const deleteCartPizza = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/cart/deletecartpizza",
        { _id: e },{
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        }
      );
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartData();
  },[]);
  return (
    <Navbar>
      {false}
     { cartData?.length !== 0  ? 
        <div className="cart-container">
          <div className="cart-left">
            <div className="cart-left-header">
              <h1>CART ITEMS</h1>
            </div>
            {cartData.map((val, idx) => (
              <div key={idx} className="cart-data">
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
              <h1>PRICE DETAILS</h1>
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
                <div>Total Ammount</div>
                <div>{price}</div>
              </div>
              <hr style={{ opacity: 0.4 }} />
              <div className="placeorder-btn">
                <Button
                  style={{
                    backgroundColor: "rgb(251, 197, 60)",
                    color: "rgb(213, 5, 5)",
                  }}
                  sx={{ width: 140 }}
                  onClick={()=>navigate('/ordersummary')}
                >
                 Check Out
                </Button>
              </div>
            </div>
          </div>
        </div>
       : 
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
              color: "rgb(213, 5, 5)",
            }}
            sx={{ width: 140 }}
          >
          Shop Now
          </Button>
        </div>
      }
    </Navbar>
  );
};

export default CartPage;
