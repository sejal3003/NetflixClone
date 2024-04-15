import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      console.error(error);
    } else {
      console.log(paymentMethod); // Handle successful payment
      setError(null);
      console.log("Sending payment request...");
      try {
        const response = await fetch("/api/payment/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: 199,
          }),
        });
        console.log("Response:", response);
        const data = await response.json();
        console.log(data); // Handle response from backend (payment succeeded or failed)
      } catch (error) {
        console.error("Error processing payment:", error);
      }
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
                <div>
                  <label>Card Details</label>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit" disabled={!stripe}>
                  Pay
                </button>
              </form>
            </div>
            <button className="Next" onClick={() => navigate("/")}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
