import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/Plan.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanCard from "../components/PlanCard"; // Import the PlanCard component

export default function Payment() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  const currency = "INR";
  const receiptId = "qwsql";

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePaymentSuccess = () => {
    setIsTransactionSuccessful(true);
    setIsNextButtonVisible(true); // Show the Next button after successful transaction
  };

  const paymentHandler = async (amount) => {
    const paiseAmount = amount * 100; // Convert rupees to paise
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: paiseAmount,
        currency,
        receipt: receiptId,
      }),
    });
    const order = await response.json();
    console.log(order);

    var option = {
      key: "",
      amount: paiseAmount,
      currency,
      name: "Netflix Subscription",
      description: "Test Transaction",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBoNFiGLLn1OUzqhNveglzC5uGYa8U1o3Sw&s",
      order_id: order.id,
      handler: async function (response) {
        toast.success("Transaction Successful");

        const body = { ...response };

        const validateResponse = await fetch("http://localhost:8000/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const jsonResponse = await validateResponse.json();

        console.log("jsonResponse", jsonResponse);
        handlePaymentSuccess();
      },
      prefill: {
        name: name, // Dynamic name
        email: "sej@example.com",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(option);
    rzp1.on("payment.failed", function (response) {
      toast.error("Payment Failed");
    });

    rzp1.open();
  };

  return (
    <div className="plans">
      <div className="planContent">
        <Header />
        <div className="d-flex justify-content-center">
          <div className="planPageBody">
            <i
              className="fas fa-check-circle"
              style={{ color: "red", fontSize: "25px", padding: "20px" }}
            ></i>
            <h5>STEP 2 OF 2</h5>
            <h2>Choose the plan thats right for you</h2>
            <p>
              "Your payment is encrypted and you can change your payment method
              at anytime".
            </p>
            <div className="subscription-cards">
              {/* PlanCard components with fixed prices */}
              <PlanCard
                title="Basic Plan"
                price={199}
                text="Supports 1 device to watch at same time (mobile phone)
              "
                title2="Resolution HD"
                handlePayment={paymentHandler} // Pass the payment handler function
              />
              <PlanCard
                title="Standard Plan"
                price={499}
                text="Supports 2 device to watch (mobile phone,computer)
              "
                title2="Resolution Full HD"
                handlePayment={paymentHandler} // Pass the payment handler function
              />
              <PlanCard
                title="Premium Plan"
                price={799}
                text="Supports 4 devices to watch mobile phone,TV,Laptop,Tablet)"
                title2="Resolution 4K (Ultra HD) + HDR"
                handlePayment={paymentHandler} // Pass the payment handler function
              />
            </div>
            {isNextButtonVisible && (
              <button className="nextButton" onClick={() => navigate("/login")}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
