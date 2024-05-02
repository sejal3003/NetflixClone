import React, { useState } from "react";
import axios from "axios";
import "../AdminPages/newMovie.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    genre: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: selectedImage,
    }));

    // Display image preview
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logindataString = localStorage.getItem("loginData");
    const logindata = JSON.parse(logindataString);
    const token = logindata.token;

    const formDataForUpload = new FormData();
    formDataForUpload.append("id", formData.id);
    formDataForUpload.append("name", formData.name);
    formDataForUpload.append("genre", formData.genre);
    formDataForUpload.append("image", formData.image);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/upload",
        formDataForUpload,
        config
      );

      console.log("Movie Uploaded:", response.data);
      toast.success("Movie Added Successfully!");
      alert("Movie Uploaded");
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error("Error uploading movie:", error);
      toast.error("Error uploading movie!");
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Movies / TV Shows</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre (comma-separated):</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ marginTop: "2px", maxWidth: "50%" }}
            />
          )}
        </div>

        <div className="upload-button-container">
          <button type="submit" className="upload-button">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
