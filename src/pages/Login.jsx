import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; // Import toast from react-toastify
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleLogIn = async () => {
    // Basic email validation
    if (!validateEmail(formValues.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Basic password validation
    if (formValues.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Make POST request to backend login endpoint
      await axios.post("http://localhost:8000/api/v1/login", {
        email: formValues.email,
        password: formValues.password,
      });

      toast.success("Login successful!"); // Display success message using toast
      alert("Login successful!");

      // If login is successful, navigate to subscription page
      navigate("/subscription");
    } catch (error) {
      // If there's an error, display error message using toast
      toast.error("Invalid email or password. Please try again.");
      console.error("Error logging in:", error);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="loginForm-container">
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="d-flex justify-content-center">
          <div className="loginFormBody flex column a-center j-between ">
            <div className="loginForm ">
              <h2>Log In</h2>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <button onClick={handleLogIn}>Log In</button>
              <div>
                {/* Forgot Password Link */}
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
                <h5>Don't have an account?</h5>
                <Link to="/signup" className="signuplink">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
