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
// const Container = styled.div`
//   padding: 0 4rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   .logo {
//     img {
//       height: 6rem;
//     }
//   }

//   button {
//     padding: 0.5rem 1rem;
//     background-color: rgb(30, 132, 195);
//     color: white;
//     border-radius: 0.2rem;
//     cursor: pointer;
//     font-weight: bolder;
//     font-size: 1.05rem;
//     border: none;
//   }

//   @media (max-width: 1024px) {
//     padding: 0 3rem;

//     .logo {
//       img {
//         height: 5rem;
//       }
//     }

//     button {
//       padding: 0.4rem 0.8rem;
//       font-size: 0.95rem;
//     }
//   }

//   @media (max-width: 768px) {
//     padding: 0 2rem;

//     .logo {
//       img {
//         height: 4rem;
//       }
//     }

//     button {
//       padding: 0.4rem 0.8rem;
//       font-size: 0.9rem;
//     }
//   }

//   @media (max-width: 600px) {
//     padding: 0 1rem;

//     .logo {
//       img {
//         height: 3.5rem;
//       }
//     }

//     button {
//       padding: 0.3rem 0.6rem;
//       font-size: 0.85rem;
//     }
//   }

//   @media (max-width: 480px) {
//     padding: 0 1rem;

//     .logo {
//       img {
//         height: 3rem;
//       }
//     }

//     button {
//       padding: 0.3rem 0.6rem;
//       font-size: 0.8rem;
//     }
//   }

//   @media (max-width: 360px) {
//     padding: 0 0.5rem;

//     .logo {
//       img {
//         height: 2.5rem;
//       }
//     }

//     button {
//       padding: 0.2rem 0.5rem;
//       font-size: 0.75rem;
//     }
//   }
// `;
