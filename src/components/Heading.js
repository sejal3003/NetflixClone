import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Heading() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("loginData"));
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    navigate("/login");
  };
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </Container>
  );
}
const Container = styled.div`
padding: 0 4rem;
.logo{
   img{
    height:6rem;
} 

}
button{
    padding:0.5rem 1rem;
    background-color:rgb(30,132,195);
    color:white;
    border-radius:0.2rem;
    cursor:pointer;s
    font-weight:bolder;
    font-size:1.05rem;
    border: none;
    

}
`;
