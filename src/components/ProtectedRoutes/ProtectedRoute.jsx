import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, path }) => {
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    const data = JSON.parse(localStorage.getItem("loginData"));
    if (!data || data.isAdmin) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return children;
};

export default ProtectedRoute;
