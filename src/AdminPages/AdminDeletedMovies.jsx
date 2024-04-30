import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminPages/adMovies.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDeletedMovies() {
  const [movies, setMovies] = useState([]);

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

  return (
    <section className="admin-movies-section">
      <div className="moviecontainer">
        <h1>Admin Movies Data</h1>
      </div>
      <div className="moviecontainer admin-mov">
        <div className="movie-list-container">
          <table className="movie-list">
            <thead>
              <tr>
                <th>Movie Id</th>
                <th>Movie Name</th>
                <th>Movie Image</th>
                <th>Movie Genre</th>
                <th>Undo</th>
              </tr>
            </thead>
            <tbody>
              {movies &&
                movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.id}</td>
                    <td>{movie.name}</td>
                    <td>
                      {movie.image && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                          alt={movie.name}
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
