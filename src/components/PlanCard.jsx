import React from "react";
import "../styles/PCard.css";

export default function PlanCards({
  title,
  price,
  text,
  title2,
  handlePayment,
}) {
  const handleClick = () => {
    handlePayment(price);
  };
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <h5 className="card-title2">{title2}</h5>
      <p className="card-text">{text}</p>
      <h6 className="price">Monthly ₹{price}</h6>
      <button className="selectPlan" onClick={handleClick}>
        Select Plan
      </button>
    </div>
  );
}
