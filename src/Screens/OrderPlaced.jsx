import React from "react";
import Navbar from "../Components/Navbars";
import Lottie from "lottie-react";
import orderplaced from "../assets/order_placed.json";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <Navbar>
      {false}
      <div className="order-placed">
        <div className="">
          {" "}
          <h1>Order Placed</h1>
        </div>
        <div>
          <Lottie
            style={{ height: "350px" }}
            animationData={orderplaced}
            loop={true}
          />
        </div>
        <div className="continue-shopping-button">
          <Button
            style={{
              backgroundColor: "rgb(251, 197, 60)",
              color: "#000",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/homepage")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default OrderPlaced;
