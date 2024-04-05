import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling toast notifications
export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
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
      // Make an HTTP POST request to your backend API endpoint
      await axios.post("http://localhost:8000/api/v1/signup", {
        email: formValues.email,
        password: formValues.password,
      });
      toast.success("Signup successful!"); // Display success message using toast
      alert("Signup successful!");

      // Redirect the user to the subscription page upon successful signup
      navigate("/subscription");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User already exists."
      ) {
        toast.error("User already exists. Please use a different email.");
      } else {
        console.error("Error signing up:", error);
        toast.error("Failed to sign up.");
      }
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div showPassword={showPassword} className="signupPageContainer">
      <BackgroundImage />
      <div className="content">
        <Header login />

        <div className="signupPageBody flex column a-center j-center">
          <div className="signupPageBodytext flex column">
            <h1>Unlimited movies,TV shows and more</h1>
            <h4>Watch anywhere.Cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership
            </h6>
          </div>
          <div className="form">
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
            {showPassword && (
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
            )}
            {!showPassword && (
              <button
                onClick={() => setShowPassword(true)}
                className="signupPageGetstartButton"
              >
                Get Started
              </button>
            )}
          </div>
          <button onClick={handleSignIn} className="signupPageButton">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
