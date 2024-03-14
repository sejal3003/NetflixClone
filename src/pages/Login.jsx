import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import "bootstrap/dist/css/bootstrap.min.css";
export default function Login() {
  const navigate=useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleLogIn = async () => {
    console.log(formValues);
    navigate('/Subscription');
  };
  return (
    <div className="loginForm-container">
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="loginFormBody flex-column a-center j-center ">
          <div className="loginTitle flex-column a-center j-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
