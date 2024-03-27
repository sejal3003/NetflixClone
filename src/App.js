import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import Subscription from "./pages/Subscription";
import Home from "./HomePage/Home";
import Plan from "./pages/Plan";
import Player from "./Player/Player";
import Movies from "./Movies/Movies";
import TVShows from "./TvShows/TVShows";
import MyList from "./MyList/MyList";

export default function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/subscription" element={<Subscription />} />
      <Route exact path="/plan" element={<Plan />} />
      <Route exact path="/payment" element={<Payment />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/player" element={<Player />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/tv" element={<TVShows />} />
      <Route exact path="/mylist" element={<MyList />} />
    </Routes>
  );
}
