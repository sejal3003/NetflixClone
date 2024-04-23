import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminPortal from "./AdminPortal/AdminPortal";
import AdminUsers from "./AdminPages/AdminUsers";
import AdminMovies from "./AdminPages/AdminMovies";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";

export default function App() {
  return (
    <div className="App">
      <ToastContainer /> {/* Incorporate ToastContainer here */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/subscription" element={<Subscription />} />
        <Route exact path="/plan" element={<Plan />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/player" element={<Player />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute path="/movies">
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tv"
          element={
            <ProtectedRoute path="/tv">
              <TVShows />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/mylist"
          element={
            <ProtectedRoute path="/mylist">
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/resetpassword/:token" element={<ResetPassword />} />
        <Route exact path="/admin" element={<AdminPortal />}>
          <Route exact path="users" element={<AdminUsers />} />
          <Route exact path="movieshow" element={<AdminMovies />} />
        </Route>
      </Routes>
    </div>
  );
}
