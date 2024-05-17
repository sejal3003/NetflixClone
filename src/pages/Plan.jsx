import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/Plan.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanCard from "../components/PlanCard"; // Import the PlanCard component

export default function Payment() {
  const navigate = useNavigate();
  // const location = useLocation();

  const [name, setName] = useState("");
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [paymentId, setPaymentId] = useState("");

  const currency = "INR";
  const receiptId = "qwsql";

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePaymentSuccess = () => {
    setIsTransactionSuccessful(true);
    setIsNextButtonVisible(true); // Show the Next button after successful transaction
    setPaymentId(paymentId);
  };

  const paymentHandler = async (amount, planId) => {
    const paiseAmount = amount * 100; // Convert rupees to paise

    // Fetch token from localStorage
    const logindataString = localStorage.getItem("loginData");
    const logindata = JSON.parse(logindataString);
    const token = logindata.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Add Content-Type header
    };

    const response = await fetch("http://localhost:8000/api/v1/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        amount: paiseAmount,
        currency,
        receipt: receiptId,
      }),
    });
    const order = await response.json();
    // console.log(order);

    var option = {
      key: "rzp_test_Lr6ky4XsrjKHBg",
      amount: paiseAmount,
      currency,
      name: "Netflix Subscription",
      description: "Test Transaction",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBoNFiGLLn1OUzqhNveglzC5uGYa8U1o3Sw&s",
      order_id: order.id,
      handler: async function (response) {
        console.log("Razorpay payment successful:", response);

        // const body = { ...response };
        try {
          const logindataString = localStorage.getItem("loginData");
          const logindata = JSON.parse(logindataString);
          const token = logindata.token;
          const userId = logindata._id;

          const validateResponse = await fetch(
            "http://localhost:8000/api/v1/validate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: order.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: userId,
                planId: planId,
              }),
            }
          );
          const jsonResponse = await validateResponse.json();

          console.log("jsonResponse", jsonResponse);

          if (jsonResponse.success) {
            toast.success("Transaction Successful");
          } else {
            toast.error("Transaction Failed");
          }
          setTransactionAmount(amount);
          handlePaymentSuccess(response.razorpay_payment_id);
        } catch (error) {
          console.error("Error processing payment verification:", error);
          toast.error("Error processing payment");
        }
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
  // const dataFromPlanPage = location.state ? location.state.sensitiveData : null;
  // const [dataFromSubscriptionPage, setDataFromSubscriptionPage] = useState("");
  // useEffect(() => {
  //   setDataFromSubscriptionPage(dataFromPlanPage);
  // }, []);

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
              "Your payment is encrypted and your transaction data is secured".
            </p>
            <div className="subscription-cards">
              {/* PlanCard components with fixed prices */}
              <PlanCard
                planId="1"
                title="Basic Plan"
                price={199}
                text="Supports 1 device to watch at same time (mobile phone)
              "
                title2="Resolution HD"
                handlePayment={(amount) => paymentHandler(amount, "1")}
              />
              <PlanCard
                planId="2"
                title="Standard Plan"
                price={499}
                text="Supports 2 device to watch (mobile phone,computer)
              "
                title2="Resolution Full HD"
                handlePayment={(amount) => paymentHandler(amount, "2")}
              />
              <PlanCard
                planId="3"
                title="Premium Plan"
                price={799}
                text="Supports 4 devices to watch mobile phone,TV,Laptop,Tablet)"
                title2="Resolution 4K (Ultra HD) + HDR"
                handlePayment={(amount) => paymentHandler(amount, "3")}
              />
            </div>
            {isTransactionSuccessful && (
              <p className="successMessage">
                "Your transaction of amount{" "}
                <strong>₹{transactionAmount}</strong> is successful".
              </p>
            )}
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
