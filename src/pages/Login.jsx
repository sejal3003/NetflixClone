import React, { useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; // Import toast from react-toastify
import "../styles/Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons

export default function Login() {
  useEffect(() => {
    if (localStorage.getItem("loginData")) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
      const { data } = await axios.post("http://localhost:8000/api/v1/login", {
        email: formValues.email,
        password: formValues.password,
      });
      console.log(data);
      const dataMsg = data.message;
      if (dataMsg === "Login successful.") {
        toast.success("Login successful!"); // Display success message using toast
        alert("Login successful!");
        const localStorageData = {
          message: dataMsg,
          token: data.token,
        };
        console.log(localStorageData);

        localStorage.setItem("loginData", JSON.stringify(localStorageData));
        // If login is successful, navigate to subscription page
        navigate("/subscription");
      }
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
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
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
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
                <span
                  className="loginPassword-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
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
