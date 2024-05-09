import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AdminPages/adProfile.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ProfileUpdateForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Enhanced password validation
    const passwordValidationMessage = validatePassword(formData.password);
    if (passwordValidationMessage !== "Password is valid.") {
      toast.error(passwordValidationMessage);
      return;
    }

    try {
      // Make API call to update admin profile
      await axios.put("http://localhost:8000/api/v1/update-profile", {
        email: formData.email,
        password: formData.password,
      });

      // Display success message using react-toastify
      toast.success("Admin Profile Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form after successful submission
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      // Display error message using react-toastify
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  return (
    <div className="profile-update-container">
      <h1>Admin Details</h1>
      <form onSubmit={handleSubmit} className="profile-update-form">
        <div className="form-group1">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value="Admin"
            disabled // Disable the input field
          />
        </div>
        <div className="form-group1">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group1">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          <span
            className="profilePassword-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>

        <button type="submit" className="update-profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
