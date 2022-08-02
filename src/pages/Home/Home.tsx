import React from "react";
//import { useNavigate } from "react-router-dom";
import Shops from "../Shops/Shops";
import { Navbar } from "../../components/Navbar";

const Home = () => {
  // let navigate = useNavigate();
  // const routeChange = () => {
  //   navigate(`/Shops`);
  // };

  return (
    <>
      <Navbar logo="/images/franchise.png" />
      <div> {/* <button onClick={routeChange}>get shops</button>{" "} */}</div>
    </>
  );
};

export default Home;
