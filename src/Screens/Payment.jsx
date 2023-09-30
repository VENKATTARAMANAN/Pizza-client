import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbars";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Payment = () => {
  const id = useParams();
  const [open, setOpen] = useState(false);
  const [data,setData]=useState("");
  const token = localStorage.getItem("AuthToken");
  const navigate = useNavigate();
  const [payment, setPayment] = useState("Online Payment");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (payment === "Online Payment") {
      function initPayment(data) {
        const options = {
          key: "rzp_test_aZuiShzt2B1yoe",
          amount: data.amount,
          currency: data.currency,
          description: "Test Transaction",
          order_id: data.id,
          handler: async (response) => {
            const val = {
              token: token,
              price: id.price,
            };
            response = { ...response, ...val };
            try {
              const data = await axios.post(
                "http://localhost:9000/pizza/verify",
                response,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              if (data.status === 200) {
                setData(data.data.data.datas)
                setOpen(true)
                setTimeout(()=>{
                  navigate("/orderplaced");
                 },1000)
                
              }
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        var razor = new window.Razorpay(options);
        razor.open();
      }

      const handlePayment = async () => {
        try {
          const response = await axios.post(
            "http://localhost:9000/pizza/orders",
            { amount: id.price },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          let value = response.data.data;
          initPayment(value);
        } catch (error) {
          console.log(error);
        }
      };
      handlePayment();
    } else {
      const confirmOrder = async () => {
        try {
          const response = await axios.post(
            "http://localhost:9000/payment/cod",
            { token: token, total: id.price },{
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.status === 200) {
           setData(response.data.data)
            setOpen(true)
                setTimeout(()=>{
                  navigate("/orderplaced");
                 },1000)
          }
        } catch (error) {
          console.log(error);
        }
      };
      confirmOrder();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
                    onClick={(e) => setPayment(e.target.value)}
                  />
                  <FormControlLabel
                    value="Cash on Delivery"
                    control={<Radio />}
                    label="Cash On Delivery"
                    onClick={(e) => setPayment(e.target.value)}
                  />
                </RadioGroup>
                <div className="payment-button">
                  <div>
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "rgb(251, 197, 60)",
                        color: "#000",
                        fontWeight: "bold",
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
      <Stack sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </Navbar>
  );
};

export default Payment;
