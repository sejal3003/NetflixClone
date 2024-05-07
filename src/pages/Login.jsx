import React, { useState, useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

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
      const { data } = await axios.post("http://localhost:8000/api/v1/login", {
        email: formValues.email,
        password: formValues.password,
      });

      const { message, token, isAdmin } = data;

      if (message === "Login successful.") {
        // Reset failed attempts on successful login
        setFailedAttempts(0);

        if (isAdmin === true) {
          toast.success("Admin Login successful!");
        } else {
          toast.success("User Login successful");
        }

        const localStorageData = {
          message,
          token,
          isAdmin,
        };

        localStorage.setItem("loginData", JSON.stringify(localStorageData));

        if (isAdmin === true) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      // Increment failed login attempts on error
      setFailedAttempts(failedAttempts + 1);

      if (failedAttempts >= 2) {
        setIsLockedOut(true);
        setTimeout(() => {
          setIsLockedOut(false);
          setFailedAttempts(0);
        }, 60000); // Lockout for 60 seconds (60000 milliseconds)
      }

      toast.error("Invalid email or password. Please try again.");
      console.error("Error logging in:", error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("loginData")) {
      navigate("/");
    }
  }, [navigate]);

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
              <button onClick={handleLogIn} disabled={isLockedOut}>
                Log In
              </button>
              {isLockedOut && (
                <p
                  style={{
                    color: "white",
                    fontStyle: "Bold",
                    textAlign: "center",
                    fontWeight: 400,
                  }}
                >
                  "Tried to login with wrong password for more than 3 times.
                  Please try again in 60 seconds".
                </p>
              )}
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
