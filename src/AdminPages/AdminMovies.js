import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminPages/adMovies.css";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);

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
        {
          headers: headers,
        }
      );

      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovieData();
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
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={index}>
                  <td>{movie.id}</td>
                  <td>{movie.name}</td>
                  <td>{movie.image}</td>
                  <td>{movie.genre}</td>
                  <td>Delete</td>
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
