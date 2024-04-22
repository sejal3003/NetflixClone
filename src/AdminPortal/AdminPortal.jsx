import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../AdminPortal/Admin.css";
import { NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaImdb } from "react-icons/fa";

export default function AdminPortal() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div classname="adcontent">
      <Navbar isScrolled={isScrolled} />
      <header>
        <div className="admincontainer d-flex justify-content-center">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/movieshow">
                  <FaImdb />
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
