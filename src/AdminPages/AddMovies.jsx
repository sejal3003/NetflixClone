import React, { useState } from "react";
import axios from "axios";
import "../AdminPages/newMovie.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    // id: "",
    name: "",
    genre: "",
    category: "",
    customCategory: "",
    image: null,
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreSelect = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre) {
      setSelectedGenres([...selectedGenres, selectedGenre]);
      setFormData((prevData) => ({
        ...prevData,
        genre: [...selectedGenres, selectedGenre].join(", "),
      }));
    }
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
    // formDataForUpload.append("id", formData.id);
    formDataForUpload.append("name", formData.name);
    formDataForUpload.append("genre", formData.genre);
    formDataForUpload.append("image", formData.image);

    // Determine category to use (custom or selected)
    const categoryToUse =
      formData.category === "Other"
        ? formData.customCategory
        : formData.category;
    formDataForUpload.append("category", categoryToUse);

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
      resetForm();
    } catch (error) {
      console.error("Error uploading movie:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const resetForm = () => {
    setFormData({
      // id: "",
      name: "",
      genre: "",
      category: "",
      customCategory: "",
      image: null,
    });
    setSelectedGenres([]);
    setImagePreview(null);
    document.getElementById("image").value = "";
  };

  return (
    <div className="form-container">
      <h2>Add New Movies / TV Shows</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            pattern="\d*"
            title="ID must contain only numbers"
            maxLength="6"
            required
          />
        </div> */}

        <div className="form-group ">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z\s]*"
            title="Name must contain only letters"
            required
          />
        </div>

        <div className="form-group selected-genres">
          <label htmlFor="genre">Genre:</label>
          <select id="genre" name="genre" onChange={handleGenreSelect} required>
            <option value="">Select Genre</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Comedy">Comedy</option>
            <option value="Thriller">Thriller</option>
            <option value="Family">Family</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="War">War</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
            <option value="Music">Music</option>
            <option value="TV Movie">TV Movie</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Mystery">Mystery</option>
            <option value="Western">Western</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Horror">Horror</option>
          </select>
          <div className="genres">
            Selected Genres: {selectedGenres.join(", ")}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Trending Now">Trending Now</option>
            <option value="New Releases">New Releases</option>
            <option value="Blockbuster Movies">Blockbuster Movies</option>
            <option value="Popular on NetaFlim">Popular on NetaFlim</option>
            <option value="Action Movies">Action Movies</option>
            <option value="Epics">Epics</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.category === "Other" && (
          <div className="form-group">
            <label htmlFor="customCategory">Custom Category:</label>
            <input
              type="text"
              id="customCategory"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ marginTop: "2px", maxWidth: "50%" }}
            />
          )}
        </div>

        <div className="button-container">
          <button type="submit" className="upload-button">
            Upload
          </button>
          <button type="button" className="reset-button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
