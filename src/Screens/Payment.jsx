import React, { useState } from "react";
import Navbar from "../Components/Navbars";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate=useNavigate();
    const[payment,setPayment]=useState("Online Payment");
    const handleSubmit=(e)=>{
        e.preventDefault();
if(payment === "Online Payment"){

}else{
    navigate("/orderplaced")
}
    }
  return (
    <Navbar>
      {false}
      <div className="payment-container">
        <div className="payment">
          <div className="payment-header">
            <h2>Payment Type</h2>
          </div>
          <div className="payment-type">
            <form onSubmit={handleSubmit}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Online Payment"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Online Payment"
                  control={<Radio />}
                  label="Online Payment"
                  onClick={(e)=>setPayment(e.target.value)}
                />
                <FormControlLabel
                  value="Cash on Delivery"
                  control={<Radio />}
                  label="Cash On Delivery"
                  onClick={(e)=>setPayment(e.target.value)}
                />
              </RadioGroup>
              <div className="payment-button">
                <div>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "rgb(251, 197, 60)",
                    color: "rgb(213, 5, 5)",
                  }}
                  sx={{ width: 140 }}
                >
                  Continue
                </Button>
                </div>
              </div>
            </FormControl>
            </form>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Payment;
