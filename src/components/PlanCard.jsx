import React from "react";
import "../styles/PCard.css";

export default function PlanCards({ title, text, title2 }) {
  return (
    <div className="card zoom">
      <h2 className="card-title">{title}</h2>
      <h5 className="card`-title2">{title2}</h5>
      <p className="card-text">{text}</p>
    </div>
  );
}
