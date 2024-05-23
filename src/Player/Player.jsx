import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import video from "../assets/video.mp4";

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const trailerUrl = location.state ? location.state.trailerUrl : null;

  // Function to convert a standard YouTube URL to an embed URL
  const getEmbedUrl = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {trailerUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(trailerUrl)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        ) : (
          <video src={video} autoPlay loop controls muted />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    iframe,
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
