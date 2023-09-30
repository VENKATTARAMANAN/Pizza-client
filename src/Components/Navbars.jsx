import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import pizzaicon from "../assets/pizza_mania.png";
import { Avatar } from "@mui/material";
import { Badge } from "@mui/material";
import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, RESET_CART } from "../Redux/Slices/pizzaSlice";

export default function Navbar({children}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show,setShow]=useState(children[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const cartArr = useSelector((state) => state.cartArr.cart);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
let sum=0
  const val=cartArr.map((cartArr)=>(
    sum+=cartArr.quantity
  ))

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/");
  }
 
  const cartQuantity = async () => {
    try {
      const token = localStorage.getItem("AuthToken");
      const { data } = await axios.post(
        "http://localhost:9000/cart/showcartquantity",{ token },{
          headers: {
            Authorization: localStorage.getItem("AuthToken"),
          },
        },
      );
      dispatch(RESET_CART());
      dispatch(ADD_TO_CART(data.data));
    } catch (error) {
      alert(error?.data);
    }
  }

useEffect(()=>{
  if(show !== false){
   cartQuantity();
  }
},[show])

  return (
    <>
      <Box sx={{ flexGrow: 0 }} >
        <AppBar className="sticky" sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ mx: 3}}>
            <div onClick={() => navigate("/homepage")}>
              <img src={pizzaicon} alt="logo" width={65} style={{cursor:"pointer"}} />
            </div>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black",fontFamily:" 'Croissant One', cursive",cursor:"pointer"}}
              onClick={() => navigate("/homepage")}
            >
             Delicious Pizza
            </Typography>
            {show ? <Badge
              badgeContent={sum > 0 ? sum : 0}
              color="error"
              sx={{ mr: 5 }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ color: "black",cursor:"pointer" }}
                onClick={() => navigate("/cartpage")}
              />
            </Badge>: <></>}
            <div>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="black"
              >
                <Avatar alt="Demo" src="" />
              </IconButton>
              <Menu
                sx={{ mt: "70px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>navigate("/myorders")}>My Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <main>{children}</main>
    </>
  );
}
