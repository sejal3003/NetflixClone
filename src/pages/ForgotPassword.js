import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; // Import toast from react-toastify
import "../styles/Password.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const handleLogIn = async () => {
    // Basic email validation
    if (!validateEmail(formValues.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Make POST request to backend login endpoint
      await axios.post("http://localhost:8000/api/v1/forgot-password", {
        email: formValues.email,
      });
      toast.success("check your email for the reset password link");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="passwordForm-container">
      <BackgroundImage />
      <div className="passcontent">
        <Header />
        <div className="d-flex justify-content-center">
          <div className="FormBody flex column a-center j-between ">
            <div className="Form ">
              <h2>Forgot Password</h2>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <button onClick={handleLogIn}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
