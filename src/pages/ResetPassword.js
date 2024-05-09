import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../styles/Password.css";

const validatePassword = (password) => {
  // Check if password length is at least 6 characters
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Check if password contains at least one digit
  if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Password meets all criteria
  return "Password is valid.";
};

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async () => {
    try {
      const passwordValidationResult = validatePassword(formValues.password);
      if (passwordValidationResult !== "Password is valid.") {
        toast.error(passwordValidationResult);
        return;
      }

      const token = window.location.pathname.split("/").pop(); // Extract token from URL

      const response = await axios.post(
        "http://localhost:8000/api/v1/resetpassword",
        {
          password: formValues.password,
          token: token,
        }
      );

      if (response.data.status) {
        toast.success("Password updated successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Password not updated. Please try again.");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="passwordForm-container">
      <BackgroundImage />
      <div className="passcontent">
        <Header />
        <div className="d-flex justify-content-center">
          <div className="FormBody flex column a-center j-between">
            <div className="Form">
              <h2>Reset Password</h2>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
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
                  className="Password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
              <button onClick={handleResetPassword}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
