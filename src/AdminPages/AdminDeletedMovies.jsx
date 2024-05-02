import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminPages/adMovies.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDeletedMovies() {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0); // State to hold the total number of movies
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDeletedMovie = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://localhost:8000/api/admin/admindeletedmovies",
        { headers: headers }
      );
      console.log(response.data);
      let movieData = response.data;
      if (movieData) {
        setMovies(movieData.movieData);
        setTotalMovies(movieData.movieData.length);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const undoMovie = async (id) => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;
      // console.log(token, id);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:8000/api/admin/undo/${id}`,
        {},
        {
          headers: headers,
        }
      );
      if (response.data.success) {
        console.log("Movie Restored Successfully");
        toast.success("Movie Restored Successfully");
        fetchDeletedMovie(); // Refetch updated movie list
      } else {
        console.error("Failed to restore movie:", response.data.error);
        toast.error("Failed to restore movie. Please try again.");
      }
    } catch (error) {
      console.error("Error restoring movie", error);
      toast.error("Error Restoring Movie");
    }
  };

  useEffect(() => {
    fetchDeletedMovie();
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
        <h1>Admin Deleted Movies Data</h1>
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

          {/* Movie table */}

          <table className="movie-list">
            <thead>
              <tr>
                <th>Movie Id</th>
                <th>Movie Name</th>
                <th>Movie Image</th>
                <th>Movie Genre</th>
                <th>Restore</th>
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
                      className="undo-btn"
                      onClick={() => undoMovie(movie._id)}
                    >
                      Restore
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
}
