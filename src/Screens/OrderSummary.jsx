import React from "react";
import Navbar from "../Components/Navbars";

const OrderSummary = () => {
  return (
    <Navbar>
      {false}
      <div className="summary-container">
        <div className="summary">
          <div className="summary-headers">
            <h1>Order Summary</h1>
          </div>

          <div className="delivery-address">
            <div className="delivery-address-headers">
                <h3>Delivery Address</h3>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default OrderSummary;
