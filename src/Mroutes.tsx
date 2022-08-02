import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Shops from "./pages/Shops/Shops";
import Franchise from "./pages/Franchise/Franchise";

const Mroutes = () => (
  <Routes>
    <Route path="/" element={<Shops />} />
    {/* <Route path="/Shops/:designation" element={<Shops />} />
    <Route path="/Franchise" element={<Franchise />} /> */}
  </Routes>
);

export default Mroutes;
