import React, { useEffect, useState } from "react";
import Pizza from "../Components/Pizza";
// import pizzadata from "../pizassdata";
import axios from "axios";
import { url } from "../Config/api";
import Navbar from "../Components/Navbars";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate=useNavigate();
  const [pizzadata, setPizzadata] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(url,{
        headers:{
          Authorization:localStorage.getItem("AuthToken")
        }
      });
      setPizzadata(response?.data?.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.data)
    }
  };
  useEffect(() => {
    let token=localStorage.getItem("AuthToken");
    if(!token){
navigate('/')
    }else{
      getData();
    }
  }, []);
  return (
    <Navbar>
      {true},
      <br/>
      <h1 className="topic">"Select Pizza and Customize It In Your Own"</h1>
      <div className="grid-container">
        <div className="row">
    {pizzadata?.map((pizza, index) => (
      <div key={index}>
    <Pizza index={index} pizza={pizza} />
    </div>
    ))}
    </div>
    </div>
    </Navbar>
    
  );
};
export default HomePage;

