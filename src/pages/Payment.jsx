import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";



export default function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
 

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Handle successful payment
    }
  };

  return (
    <div className="paymentPage">
      <div className="content">
        <Header />
        <div className="d-flex justify-content-center">
          <div className="paymentCard">
            <i
              className="fas fa-check-circle"
              style={{ color: "red", fontSize: "25px", padding: "20px" }}
            ></i>
            <h5>STEP 3 OF 3</h5>
            <h1>
              <b>Choose How to pay</b>
            </h1>
            <p>
              Your payment is encrypted and you can change your payment method
              at anytime.
            </p>
            <p>Secure for peace of mind. Cancel easily online.</p>
            <div className="payment-container">
             <form onSubmit={handleSubmit}>
                <CardElement/>
                <button type="submit" disabled={!stripe}>
                  Pay
                </button>
              </form>
            </div>
            <button className="Next" onClick={() => navigate("/home")}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
