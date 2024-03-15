import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleLogIn = async () => {
    console.log(formValues);
    navigate("/subscription");
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
