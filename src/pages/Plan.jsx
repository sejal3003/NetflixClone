import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../styles/Plan.css";
import PlanCard from "../components/PlanCard";

const Plan = () => {
  const navigate = useNavigate();
  return (
    <div className="plans">
      <div className="content">
        <Header />
        <div className="d-flex justify-content-center">
          <div className="planPageBody">
            <i
              className="fas fa-check-circle"
              style={{ color: "red", fontSize: "25px", padding: "9px" }}
            ></i>
            <h5>STEP 2 OF 3</h5>
            <h2>Choose the plan thats right for you</h2>

            <div className="subscription-cards  ">
              <PlanCard
                title="Basic Plan"
                text="Supported devices
                 TV, computer, mobile phone, tablet"
                title2="Resolution 720p (HD)"
              />

              <PlanCard
                title="Standard Plan"
                text="Supported devices
                      TV, computer, mobile phone, tablet"
                title2="Resolution
                        1080p (Full HD)"
              />
              <PlanCard
                title="Premium Plan"
                text="Supported devices
                        TV, computer, mobile phone, tablet"
                title2="Resolution
                     4K (Ultra HD) + HDR"
              />
            </div>
            <button className="nextButton" onClick={() => navigate("/payment")}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
