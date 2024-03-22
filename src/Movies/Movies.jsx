import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

export default function Movies() {
  const [backgroundImage, setBackgroundImage] = useState(img1);
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(genres,movies);
  // Array of imported images
  const images = [img1, img2, img3, img4, img5];

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  // Function to change the background image
  const changeBackgroundImage = () => {
    const newImage = selectRandomImage();
    setBackgroundImage(newImage);
  };

  // useEffect hook to change background image every 5 seconds (for demonstration)
  useEffect(() => {
    const interval = setInterval(() => {
      changeBackgroundImage();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []); // Run once on component mount

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movies" }));
    }
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            minHeight: "70vh", // Adjust the height here (e.g., 50vh)
            backgroundSize: "cover", // Adjust the background size to cover the container
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", // Center the background image
            transition: "background-image 0.5s",
          }}
        >
          <SelectGenre genres={genres} type="movie" />
        </div>
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: black;
  .data {
    margin-top: 8rem;

    .notAvailable {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
