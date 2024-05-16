import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md"; // Import delete icon

import axios from "axios";

export default React.memo(function Card({ movieData, isInMyList, onRemove }) {
  // console.log("MovieData:", movieData);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const likeMovie = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;
      // console.log("movie id is ", logindata);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        "http://localhost:8000/api/v1/like",
        {
          movieId: movieData._id,
        },
        {
          headers: headers,
        }
      );

      setIsLiked(true);

      if (response.data.message === "Movie removed from liked list") {
        setIsLiked(false);
      }
      if (response.data.message === "Movie liked successfully") {
        setIsDisliked(false);
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("You need to login first");
    }
  };

  const dislikeMovie = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        "http://localhost:8000/api/v1/dislike",
        {
          movieId: movieData._id,
        },
        {
          headers: headers,
        }
      );

      setIsDisliked(true);
      if (response.data.message === "Movie removed from disliked list") {
        setIsDisliked(false);
      }
      if (response.data.message === "Movie disliked successfully") {
        setIsLiked(false);
      }
      // console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("You need to login first");
    }
  };

  const toggleMyList = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;
      // console.log("movie id is ", logindata);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        "http://localhost:8000/api/v1/mylist",
        {
          movieId: movieData._id,
        },
        {
          headers: headers,
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("You need to login first");
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />
      <h6>{movieData.name}</h6>
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill
                  title="Like"
                  onClick={likeMovie}
                  className={isLiked ? "liked thumbupColor" : ""}
                />
                <RiThumbDownFill
                  title="Dislike"
                  onClick={dislikeMovie}
                  className={isDisliked ? "disliked thumbupColor" : ""}
                />
                {isInMyList ? (
                  <BsCheck
                    title="Remove From the List"
                    onClick={toggleMyList}
                    className="added"
                  />
                ) : (
                  <AiOutlinePlus
                    title="Add to My List"
                    onClick={toggleMyList}
                  />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genre &&
                  movieData.genre.map((genre) => <li key={genre}>{genre}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
      {isInMyList && ( // Render remove button if isInMyList is true
        <RemoveButton onClick={() => onRemove(movieData._id)}>
          <MdDelete />
        </RemoveButton>
      )}
    </Container>
  );
});
const RemoveButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.9rem;
  font-weight: bold; /* Make the icon bold */
  transition: color 0.3s ease;
  &:hover {
    color: #d32f2f;
  }
`;

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
    color: white;
  }
  h6 {
    padding-top: 12px;
    padding-left: 25px;
    color: white;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: relative;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      color: white;
      h3 {
        color: white;
      }
    }

    .icons {
      .controls {
        display: flex;
        gap: 1.5rem;
        color: white;
      }
      .thumbupColor {
        color: rgb(30, 132, 195);
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
