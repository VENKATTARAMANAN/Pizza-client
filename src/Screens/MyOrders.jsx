import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbars";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import axios from "axios";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import emptycart from "../assets/empty_cart.json";
import noorders from "../assets/no_orders.json"

const steps = ["Order Confirmed", "Preparing Your pizza", "Out For Delivery","Order Delivered"];

const MyOrders = () => {
  const navigate=useNavigate();
  const token = localStorage.getItem("AuthToken");
  const [cod, setCod] = useState([]);
  const [onlinepaid, setOnlinePaid] = useState([]);
  const [nodata,setNoData]=useState("")
  const getOrders = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/myorders/getmyorders",
        { token: token },{
          headers:{
            Authorization:localStorage.getItem("AuthToken")
          }
        }
      );
      if (data.data.statuscode === 200) {
        setCod(data.data.cod.reverse());
        setOnlinePaid(data.data.onlinepayment.reverse());
      }
    } catch (error) {
      console.log(error);
      setNoData(error.response.status);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Navbar>
      {true}
      {(nodata !== 404) ?
      <Box sx={{ marginTop: "70px", padding: "20px" }}>
        {/*-----------------------Online Paid Orders------------------------------  */}

        <Accordion sx={{ bgcolor: "#ffd740" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Online Paid Orders
            </Typography>
          </AccordionSummary>
          <Box sx={{ bgcolor: "#ffd740", px: "20px" }}>
            {onlinepaid.map((val, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ bgcolor: "#ff9800" }}
                >
                  <div className="myorder-top-header">OrderId:{val._id}</div>
                </AccordionSummary>
                <AccordionDetails>
                  {val.items.map((val, idx) => (
                    <div key={idx} className="cart-datas">
                      <div className="cart-img">
                        <img src={val.image} alt="cart" />
                      </div>
                      <div className="cart-name">
                        <div style={{width:"130px"}}>
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
                  <br />
                  <hr/>
                  <br />
                  <div className="myorder-status">
                      <div className="myorder-status-header">Order Status</div>
                      <div>
                        <br />
                        <Box sx={{ width: "100%" }}>
                          <Stepper
                            activeStep={val.orderstep}
                            alternativeLabel
                          >
                            {steps.map((label) => (
                              <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                      </div>
                    </div>
                </AccordionDetails>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ bgcolor: "#ff9800" }}
                  >
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                      Order Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="order-details">
                      <div className="order-total">
                        <div className="myorder-headers">Total</div>
                        <div>{val.total}</div>
                      </div>
                      <div className="pay-mode">
                        <div className="myorder-headers">Payment Mode</div>
                        <div>{val.paymentmode}</div>
                      </div>
                      <div className="payment-status">
                        <div className="myorder-headers">Payment Status</div>
                        <div>{val.paymentstatus}</div>
                      </div>
                      <div className="order-address">
                        <div className="myorder-headers">Address</div>
                        <div>
                          {val.address.name} <br />
                          {val.address.houseno},{val.address.street}, <br />
                          {val.address.city}-{val.address.pincode}. <br />
                          Phone:{val.address.phone},<br />
                          Alt.phone:{val.address.altphone}.
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </Accordion>
            ))}
          </Box>
        </Accordion>

        {/*-----------------------Cash On Delivery Orders------------------------------  */}

        <Accordion sx={{ bgcolor: "#ffd740" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Cash On Delivery Orders
            </Typography>
          </AccordionSummary>
          <Box sx={{ bgcolor: "#ffd740", px: "20px" }}>
            {cod.map(
              (val, index) => (
                (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ bgcolor: "#ff9800" }}
                    >
                      <div className="myorder-top-header">
                        OrderId:{val._id}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {val.items.map((val, idx) => (
                        <div key={idx} className="cart-datas">
                          <div className="cart-img">
                            <img src={val.image} alt="cart" />
                          </div>
                          <div className="cart-name">
                            <div style={{width:"130px"}}>
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
                      <br />
                      <hr />
                      <br />
                      <div className="myorder-status">
                          <div className="myorder-status-header">
                            Order Status
                          </div>
                          <div>
                            <br />
                            <Box sx={{ width: "100%" }}>
                              <Stepper
                                activeStep={val.orderstep}
                                alternativeLabel
                              >
                                {steps.map((label) => (
                                  <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                            </Box>
                          </div>
                        </div>
                    </AccordionDetails>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ bgcolor: "#ff9800" }}
                      >
                        <Typography
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Order Details
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="order-details">
                          <div className="order-total">
                            <div className="myorder-headers">Total</div>
                            <div>{val.total}</div>
                          </div>
                          <div className="pay-mode">
                            <div className="myorder-headers">Payment Mode</div>
                            <div>{val.paymentmode}</div>
                          </div>
                          <div className="payment-status">
                            <div className="myorder-headers">
                              Payment Status
                            </div>
                            <div>{val.paymentstatus}</div>
                          </div>
                          <div className="order-address">
                            <div className="myorder-headers">Address</div>
                            <div>
                              {val.address.name} <br />
                              {val.address.houseno},{val.address.street}, <br />
                              {val.address.city}-{val.address.pincode}. <br />
                              Phone:{val.address.phone},<br />
                              Alt.phone:{val.address.altphone}.
                            </div>
                          </div>
                        </div>
                        
                      </AccordionDetails>
                    </Accordion>
                  </Accordion>
                )
              )
            )}
          </Box>
        </Accordion>
      </Box> : 
      <div className="lottie-empty-cart">
        <h1>No Order Found</h1>
          <Lottie
            style={{ height: "350px" }}
            animationData={noorders}
            loop={true}
          />
          <Button
            onClick={() => navigate("/homepage")}
            style={{
              backgroundColor: "rgb(251, 197, 60)",
              color: "#000",
              fontWeight:"bold"
            }}
            sx={{ width: 140 }}
          >
          Shop Now
          </Button>
        </div> }
    </Navbar>
  );
};

export default MyOrders;
