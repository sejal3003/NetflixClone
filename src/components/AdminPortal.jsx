import React, { useState } from "react";
import {
  FaUserCircle,
  FaUserFriends,
  FaMoneyCheckAlt,
  FaBars,
} from "react-icons/fa";
import { MdLocalMovies, MdAddToPhotos } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Admin.css";
import Layout from "./Layout/Layout";

const AdminPortal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin/profile",
      name: "Admin Profile",
      icon: <FaUserCircle />,
    },
    {
      path: "/admin/users",
      name: "View All Users",
      icon: <FaUserFriends />,
    },
    {
      path: "/admin/movieslist",
      name: "View All Movies/TV Shows",
      icon: <MdLocalMovies />,
    },
    {
      path: "/admin/addmov",
      name: "Add Movies/TV Shows",
      icon: <MdAddToPhotos />,
    },
    {
      path: "/admin/deletemov",
      name: "Deleted Movies/TV Shows",
      icon: <RiDeleteBinLine />,
    },
    {
      path: "/admin/activesub",
      name: "Subscriptions",
      icon: <FaMoneyCheckAlt />,
    },
  ];
  return (
    <div className="admincontainer">
      <Layout />
      <div style={{ width: isOpen ? "600px" : "70px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Admin Panel
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      <main>
        <Outlet />
        {children}
      </main>
    </div>
  );
};

export default AdminPortal;
