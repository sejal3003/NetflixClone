import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../styles/Plan.css";

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
              <Card style={{ width: "100rem" }}>
                <Card.Body>
                  <Card.Title>
                    <div className="card">Basic Plan</div>
                  </Card.Title>
                  <Card.Text>
                    <h3>Video and sound quality Good</h3>
                    <p>Resolution 720p (HD)</p>
                    <h5>
                      Supported devices TV, computer, mobile phone, tablet
                    </h5>
                    <h6>Devices your household can watch at the same time:1</h6>
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    ₹199/month
                  </Card.Subtitle>
                  <Button variant="secondary">Subscribe</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: "100rem" }}>
                <Card.Body>
                  <Card.Title>
                    <div className="card">Standard Plan</div>
                  </Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus eleifend nisi sed magna fermentum.
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    $13.99/month
                  </Card.Subtitle>
                  <Button variant="secondary">Subscribe</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: "100rem" }}>
                <Card.Body>
                  <Card.Title>
                    <div className="card">Premium Plan</div>
                  </Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus eleifend nisi sed magna fermentum.
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    $16.99/month
                  </Card.Subtitle>
                  <Button variant="secondary">Subscribe</Button>
                </Card.Body>
              </Card>
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
