import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Payment.css";
export default function Payment() {
  
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedUPIOption, setSelectedUPIOption] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setSelectedUPIOption("");
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleUpiIdChange = (event) => {
    setUpiId(event.target.value);
  };
  const handleUPIOptionChange = (event) => {
    setSelectedUPIOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process payment based on selected payment method
    if (paymentMethod === "card") {
      // Process card payment
      console.log("Processing card payment with card number:", cardNumber);
    } else if (paymentMethod === "upi") {
      // Process UPI payment
      console.log("Processing UPI payment with UPI ID:", upiId);
    } else {
      // Handle unsupported payment method
      console.error("Unsupported payment method");
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
              <form className="form-group " onSubmit={handleSubmit}>
                <div className="select-payment-method">
                  <label style={{ fontSize: "20px", margin: "2%" }}>
                    Payment Method:
                    <select
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="card">Debit/Credit Card</option>
                      <option value="upi">UPI Pay</option>
                    </select>
                  </label>
                </div>
                {paymentMethod === "card" && (
                  <div>
                    <label>
                      Card Number:
                      <input
                        className="input-field"
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                    </label>
                  </div>
                )}
                {paymentMethod === "upi" && (
                  <div>
                    <label className="subInput">
                      UPI ID:
                      <input
                        className="input-field"
                        type="text"
                        value={upiId}
                        onChange={handleUpiIdChange}
                      />
                    </label>
                    <br></br>
                    <div className="radio-buttons">
                      <label className="upi-option-label">
                        Select UPI Option:
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="upiOption"
                          value="PhonePe"
                          checked={selectedUPIOption === "PhonePe"}
                          onChange={handleUPIOptionChange}
                        />
                        PhonePe
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="upiOption"
                          value="Google Pay"
                          checked={selectedUPIOption === "Google Pay"}
                          onChange={handleUPIOptionChange}
                        />
                        Google Pay
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="upiOption"
                          value="Paytm"
                          checked={selectedUPIOption === "Paytm"}
                          onChange={handleUPIOptionChange}
                        />
                        Paytm
                      </label>
                    </div>
                  </div>
                )}
                <button className="submit-button" type="submit">
                  Submit Payment
                </button>
              </form>
            </div>
            <button className="Next" onClick={() => navigate("/plan")}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
