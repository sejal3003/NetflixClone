import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [name, setName] = useState("");
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  const currency = "INR";
  const receiptId = "qwsql";

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePaymentSuccess = () => {
    setIsTransactionSuccessful(true);
    setIsNextButtonVisible(true); // Show the Next button after successful transaction
  };

  const paymentHandler = async (e) => {
    const paiseAmount = selectedAmount * 100; // Convert rupees to paise
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
        alert("Transaction successful");
        const body = { ...response };

        const validateResponse = await fetch("http://localhost:8000/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const jsonResponse = await validateResponse.json();

        // console.log("jsonResponse", jsonResponse);
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
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    e.preventDefault();
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
              <div className="amount-selection">
                <p>"Select the Plan For Subscription"</p>
                <label>
                  <h6>Basic Plan :</h6>
                  <input
                    type="radio"
                    value={199}
                    checked={selectedAmount === 199}
                    onChange={() => handleAmountChange(199)}
                  />
                  ₹199
                </label>
                <label>
                  <h6>Standard Plan :</h6>
                  <input
                    type="radio"
                    value={499}
                    checked={selectedAmount === 499}
                    onChange={() => handleAmountChange(499)}
                  />
                  ₹499
                </label>
                <label>
                  <h6>Premium Plan :</h6>
                  <input
                    type="radio"
                    value={699}
                    checked={selectedAmount === 699}
                    onChange={() => handleAmountChange(699)}
                  />
                  ₹699
                </label>
              </div>
              <button onClick={paymentHandler}>Subscribe</button>
            </div>
            {isNextButtonVisible && (
              <button className="Next" onClick={() => navigate("/login")}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
