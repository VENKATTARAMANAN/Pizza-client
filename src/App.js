import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Screens/HomePage";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import ForgotPassword from "./Screens/ForgotPassword";
import CheckForgetPassOtp from "./Screens/CheckForgetPassOtp";
import ChangePassword from "./Screens/ChangePassword";
import CustomizePizza from "./Screens/CustomizePizza";
import CartPage from "./Screens/CartPage";
import Address from "./Screens/Address";
import Payment from "./Screens/Payment";
import OrderPlaced from "./Screens/OrderPlaced";
import OrderSummary from "./Screens/OrderSummary";
import UpdateAddress from "./Screens/UpdateAddress";
import MyOrders from "./Screens/MyOrders";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forpass-otp-confirm" element={<CheckForgetPassOtp />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/customizepizza/:id" element={<CustomizePizza />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment/:price" element={<Payment />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/updateaddress" element={<UpdateAddress/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
      </Routes>
    </div>
  );
}

export default App;
