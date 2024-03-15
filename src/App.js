import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Subscription from "./pages/Subscription";
import Plan from "./pages/Plan";

export default function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Signup />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/subscription" element={<Subscription />} />
      <Route exact path="/plan" element={<Plan />} />
    </Routes>
  );
}
