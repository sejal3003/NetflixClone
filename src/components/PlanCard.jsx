import React from "react";
import "../styles/PCard.css";

export default function PlanCards({ title, price, text, title2 }) {
  return (
    <div className="card zoom">
      <h2 className="card-title">{title}</h2>
      <h6 className="price">{price}</h6>
      <h5 className="card`-title2">{title2}</h5>
      <p className="card-text">{text}</p>
    </div>
  );
}
