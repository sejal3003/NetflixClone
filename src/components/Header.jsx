import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("loginData"));
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("loginData");

    // Redirect the user to the login page or any other appropriate page
    navigate("/login"); // Assuming "/login" is the route for your login page
  };

  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button
        className={`${props.login ? "" : "d-none"}`}
        onClick={() => {
          if (props.login) {
            navigate("/login"); // Redirect to the login page
          } else {
            handleLogout(); // Call the handleLogout function directly
            alert("logout"); // Optionally, you can include an alert here
            navigate("/login"); // Redirect to the login page
          }
        }}
      >
        {props.login ? "Log In " : "Log Out"}
      </button>
    </Container>
  );
}
const Container = styled.div`
padding: 0 4rem;
.logo{
   img{
    height:5rem;
} 

}
button{
    padding:0.5rem 1rem;
    background-color:#e50914;
    color:white;
    border-radius:0.2rem;
    cursor:pointer;s
    font-weight:bolder;
    font-size:1.05rem;
    border: none;
    

}
`;
