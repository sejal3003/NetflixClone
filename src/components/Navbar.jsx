import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { useSearch } from "../components/Context/SearchContext";

let isAdmin = false;
export default function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("loginData"));
  if (data) {
    isAdmin = data.isAdmin;
  }
  const { searchMovies } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchQuery);
    if (searchQuery.trim() !== "") {
      await searchMovies(searchQuery);
    } else {
      await searchMovies(null); // Call searchMovies with null to fetch all movies
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("loginData");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleClick = (name) => {
    setActiveLink(name); // Update active link state
  };
  // console.log(isLoggedIn, data);
  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link
                    to={link}
                    className={isAdmin ? "adminLinksColor" : ""}
                    onClick={() => handleClick(name)}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              title="Search"
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
            <button
              type="submit"
              className="searchButton"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {isLoggedIn === false && data ? (
            <button title="Logout" onClick={handleLogout}>
              <FaPowerOff />
            </button>
          ) : (
            <button title="Login" onClick={handleLogin}>
              <LuLogIn />
            </button>
          )}
          {/* <button
            onClick={() => {
              handleLogout();
              alert("logout");
              navigate("/login");
            }}
          >
            <FaPowerOff />
          </button> */}
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  .adminLinksColor {
    color: rgb(30, 132, 195) !important;
    ${"" /* border-bottom: 2px solid white !important; */}
  }

  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            font-weight: 600;
            font-size: 1.2rem;
            text-decoration: none;
          }
        }
      }
    }
    .searchButton {
      color: white;
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: rgb(30, 132, 195);
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
      button {
        position: relative;
        cursor: pointer;
      }

      button:hover::before {
        content: attr(title);
        background-color: #333;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        position: absolute;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      button:hover::before {
        opacity: 1;
      }
    }
  }
`;
