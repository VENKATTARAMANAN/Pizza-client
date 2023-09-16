import React from "react";
import Navbar from "../Components/Navbars";
import Lottie from "lottie-react";
import orderplaced from "../assets/order_placed.json";

const OrderPlaced = () => {
  return (
    <Navbar>
      {false}
      <div className="order-placed">
       <div className=""> <h1>Order Placed</h1></div>
       <div>
       <Lottie
          style={{ height: "350px" }}
          animationData={orderplaced}
          loop={true}
        />
       </div>
      </div>
    </Navbar>
  );
};

export default OrderPlaced;
