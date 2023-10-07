import React, { useEffect, useState } from "react";
import Pizza from "../Components/Pizza";
// import pizzadata from "../pizassdata";
import axios from "axios";
import { url } from "../Config/api";
import Navbar from "../Components/Navbars";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  let token = localStorage.getItem("AuthToken");
  const navigate = useNavigate();
  const [pizzadata, setPizzadata] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/pizza/all`, {
        headers: {
          Authorization: localStorage.getItem("AuthToken"),
        },
      });
      setPizzadata(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getData();
    }
  }, []);
  return (
    <Navbar>
      {true}
      <div style={{ marginTop: "100px", fontSize: "13px" }}>
        <h2 className="topic">"Select Pizza and Customize It In Your Own"</h2>
      </div>
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
