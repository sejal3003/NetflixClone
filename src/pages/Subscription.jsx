import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";
export default function Subscription() {
  const navigate = useNavigate();
  return (
    
    <div className="subscription">
     <div className="content">
      <Header />
    
      <div className="subscriptionBody">
      <i className="fas fa-check-circle" style={{ color: "red", fontSize: "25px", padding: "20px" }}></i>
        <h5>STEP 1 OF 3</h5>
        <h1>
          <b>Subscribe to our latest Plans!</b>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing!");
            navigate("/");
          }}
        ></form>

       
        <p> <i className="fas fa-check icons" style={{ color: 'red', verticalAlign: 'middle' }}></i>Get the latest updates and offers straight to your inbox.</p>
        <p> <i className="fas fa-check icons" style={{ color: 'red', verticalAlign: 'middle' }}></i>No commitments, cancel anytime.</p>
        <p> <i className="fas fa-check icons" style={{ color: 'red' }}></i>Everything on Netflix for one low price.</p>

        <button onClick={() => navigate("/")}>Next</button>
      </div>
      </div>
      </div>
  );
}
