import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminPages/adMovies.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0); // State to hold the total number of movies
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Function to fetch movie data
  const fetchMovieData = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://localhost:8000/api/admin/getmovies",
        { headers: headers }
      );

      setMovies(response.data);
      setTotalMovies(response.data.length);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Function to handle movie deletion
  const handleDelete = async (id) => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:8000/api/admin/deletemovies/${id}`, {
        headers: headers,
      });

      // Refetch movie data after deletion
      console.log("Movie deleted successfully");
      toast.success("Movie Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchMovieData();
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete Movie. Please try again.", {
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

  useEffect(() => {
    fetchMovieData();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="admin-movies-section">
      <div className="moviecontainer">
        <h1>Admin Movies / TVShows Data</h1>
      </div>
      <div className="moviecontainer admin-mov">
        <div className="search-bar-container">
          {/* Search bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by movie name..."
            className="listsearch-bar"
          />
        </div>
        <div className="movie-list-container">
          {/* Display total number of movies */}
          <p style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}>
            Total Movies: {totalMovies}
          </p>

          {/* Movie table with filtered results */}
          <table className="movie-list">
            <thead>
              <tr>
                <th>Movie Id</th>
                <th>Movie Name</th>
                <th>Movie Image</th>
                <th>Movie Genre</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.id}</td>
                  <td>{movie.name}</td>

                  <td>
                    {movie.image.startsWith("uploads") ? (
                      <img
                        src={`http://localhost:8000/${movie.image}`}
                        alt={movie.name}
                        style={{ maxWidth: "100px", maxHeight: "150px" }}
                      />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                        alt={movie.name}
                        style={{ maxWidth: "100px", maxHeight: "150px" }}
                      />
                    )}
                  </td>
                  <td>{movie.genre.join(", ")}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminMovies;
