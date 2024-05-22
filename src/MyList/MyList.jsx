import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Layout from "../components/Layout/Layout";
import axios from "axios";

export default function MyList() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyList = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("http://localhost:8000/api/v1/mylist", {
        headers,
      });

      const { wishlist } = response.data;
      setMovies(wishlist);
    } catch (error) {
      console.error("Error fetching user's movie list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyList();
  }, []);

  const removeFromList = async (movieId) => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.put(
        "http://localhost:8000/api/v1/mylist/",
        { movieId },
        {
          headers,
        }
      );

      // After successful removal, refetch the updated movie list
      fetchMyList();
    } catch (error) {
      console.error("Error removing movie from list:", error);
    }
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Layout isScrolled={isScrolled} />

        <div className="listcontent flex column align-left">
          <h2>User My Watch List</h2>
          <div className="grid flex ">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              movies.map((movie, index) => (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie._id} // Assuming _id is the unique identifier for movies
                  isInMyList={true}
                  onRemove={() => removeFromList(movie._id)} // Pass remove function to Card component
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    ${"" /* justify-content: space-between; */}
    justify-content: flex-start;
    padding: var(--bs-navbar-padding-y) var(--bs-navbar-padding-x);
  }
  .listcontent {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    color: white;
    h2 {
      margin-bottom: 1rem;
    }

    .grid {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: flex-start; /* Align movies to the left */
    }
  }
`;
