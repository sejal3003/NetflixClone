import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import Layout from "../components/Layout/Layout";
import { fetchGenres, fetchMovies } from "../utils/Movieapi";
import Loader from "../components/Loader";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [backgroundImage, setBackgroundImage] = useState(img1);
  const [isScrolled, setIsScrolled] = useState(false);

  // const genres = useSelector((state) => state.netflix.genres);
  // const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  // const dispatch = useDispatch();

  const images = [img1, img2, img3, img4, img5];

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  //fetchgenres
  useEffect(() => {
    const fetchGenresData = async () => {
      const data = await fetchGenres();
      console.log(data);
      setGenre(data);
    };
    fetchGenresData();
  }, []);

  //fetching movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };
    fetchData();
  }, []);

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

  // useEffect(() => {
  //   dispatch(getGenres());
  // }, []);

  // useEffect(() => {
  //   if (genresLoaded) {
  //     dispatch(fetchMovies({ type: "movies" }));
  //   }
  // }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Layout isScrolled={isScrolled} />
      </div>
      <div className="data">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            minHeight: "100vh", // Adjust the height here (e.g., 50vh)
            backgroundSize: "cover", // Adjust the background size to cover the container
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", // Center the background image
            transition: "background-image 0.5s",
          }}
        >
          <SelectGenre genres={genre} type="movie" />
        </div>
        {isLoading ? (
          <Loader />
        ) : movies.length ? ( // Check if movies array has data
          <Slider />
        ) : (
          <NotAvailable />
        )}
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
