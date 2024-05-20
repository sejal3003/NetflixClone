import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Subscription.css";
export default function Subscription() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sensitiveData] = useState("Signup successful!");

  const handleNextClick = () => {
    navigate("/plan", { state: { sensitiveData } });
  };

  const dataFromSubscriptionPage = location.state
    ? location.state.sensitiveData
    : null;
  const [dataFromSignupPage, setDataFromSignupPage] = useState("");
  useEffect(() => {
    setDataFromSignupPage(dataFromSubscriptionPage);
  }, []);

  return (
    <div className="subscription">
      <div className="content">
        <Heading />
        <div className="d-flex justify-content-center">
          {dataFromSignupPage === "Signup successful!" ? (
            <div className="subscriptionBody">
              <i
                className="fas fa-check-circle"
                style={{ color: "red", fontSize: "25px", padding: "20px" }}
              ></i>
              <h5>STEP 1 OF 2</h5>
              <h1>
                <b>Subscribe to our latest Plans!</b>
              </h1>

              <p>
                {" "}
                <i
                  className="fas fa-check icons"
                  style={{ color: "red", verticalAlign: "middle" }}
                ></i>
                Get the latest updates and offers straight to your inbox.
              </p>
              <p>
                {" "}
                <i
                  className="fas fa-check icons"
                  style={{ color: "red", verticalAlign: "middle" }}
                ></i>
                No commitments, just pure entertainment.
              </p>
              <p>
                {" "}
                <i className="fas fa-check icons" style={{ color: "red" }}></i>
                Access everything on Netflix at an unbeatable price.
              </p>

              <button onClick={handleNextClick}>Next</button>
            </div>
          ) : (
            <div>
              <p>No Access to this page</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
