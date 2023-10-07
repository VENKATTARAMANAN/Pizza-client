import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbars";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { url } from "../Config/api";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const addressData = async () => {
    try {
      const token = localStorage.getItem("AuthToken");
      const response = await axios.post(
        `${url}/address/getaddress`,
        { token: token },
        {
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        }
      );
      setAddress(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    }
  };

  useEffect(() => {
    addressData();
    getCartData();
  }, []);

  return (
    <Navbar>
      {false}
      <div className="summary-container">
        <div className="summary">
          <div className="summary-headers">Order Summary</div>
          <div className="delivery-address">
            <div className="delivery-address-headers">
              <div>
                <h3>Delivery Address</h3>
              </div>
              <div>
                <Button
                  style={{
                    maxWidth: "130px",
                    maxHeight: "30px",
                    fontSize: "9px",
                    backgroundColor: "rgb(251, 197, 60)",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/updateaddress")}
                >
                  Change address
                </Button>
              </div>
            </div>
            <div className="delivery-ad-data">
              {address.name},<br/>
              {address.houseno},{address.street},<br />
              {address.city},<br />
              {address.landmark},<br />
              {address.city}-{address.pincode}. <br />
              Phone:{address.phone}
             
            </div>
          </div>
          <div className="ordersummary-values">
            {cartData.map((val, idx) => (
              <div key={idx} className="ordersummary-val">
                <div className="cart-img">
                  <img src={val.image} alt="cart" />
                </div>
                <div className="cart-name">
                  <div style={{ width: "130px" }}>
                    {val.name}
                    <span>({val.selectsize})</span>
                  </div>
                </div>
                <div className="cart-price">
                  <div> Quantity</div>
                  <div>{val.quantity}</div>
                </div>
                <div className="cart-price">
                  <div>PRICE</div>
                  <div>{val.price * val.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-cartvalue">
            <div>Grand Total</div>
            <div>{price}</div>
          </div>
          <div className="ordersummary-button">
            <Button
              style={{
                fontSize: "15px",
                backgroundColor: "rgb(251, 197, 60)",
                color: "#000",
                fontWeight: "bold",
              }}
              onClick={() => navigate(`/payment/${price}`)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default OrderSummary;
