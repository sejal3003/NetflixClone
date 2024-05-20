import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";
import Home from "./HomePage/Home";
import Plan from "./pages/Plan";
import Player from "./Player/Player";
import Movies from "./Movies/Movies";
import TVShows from "./TvShows/TVShows";
import MyList from "./MyList/MyList";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminPortal from "./components/AdminPortal";
import AdminUsers from "./AdminPages/AdminUsers";
import AdminMovies from "./AdminPages/AdminMovies";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import AdminProfile from "./AdminPages/AdminProfile";
import AdminDeletedMovies from "./AdminPages/AdminDeletedMovies";
import AddMovies from "./AdminPages/AddMovies";
import { SearchProvider } from "./components/Context/SearchContext"; // Import SearchProvider
import SubscribedUsers from "./AdminPages/SubscribedUsers";
import { GenreProvider } from "./components/Context/GenreContext";

export default function App() {
  return (
    <SearchProvider>
      <div className="App">
        <ToastContainer /> {/* Incorporate ToastContainer here */}
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/subscription" element={<Subscription />} />
          <Route exact path="/plan" element={<Plan />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute path="/">
                <GenreProvider>
                  <Home />
                </GenreProvider>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/player"
            element={
              <ProtectedRoute path="/player">
                <Player />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute path="/movies">
                <GenreProvider>
                  <Movies />
                </GenreProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv"
            element={
              <ProtectedRoute path="/tv">
                <GenreProvider>
                  {" "}
                  <TVShows />
                </GenreProvider>
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
          <Route
            exact
            path="/resetpassword/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/admin" element={<AdminPortal />}>
            <Route exact path="users" element={<AdminUsers />} />
            <Route exact path="movieslist" element={<AdminMovies />} />
            <Route exact path="profile" element={<AdminProfile />} />
            <Route exact path="deletemov" element={<AdminDeletedMovies />} />
            <Route exact path="addmov" element={<AddMovies />} />
            <Route exact path="activesub" element={<SubscribedUsers />} />
          </Route>
        </Routes>
      </div>
    </SearchProvider>
  );
}
