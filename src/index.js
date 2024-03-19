import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51OvtIZSIokf14IAPBmfATVZAFkF9SZikjgTMxOnTVsxxefPsd6UbXiATOCqDYABTmKjQGygawBzygLSI6uhNTS9F00XPJ8mLZr");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <BrowserRouter>
    <React.StrictMode>
    <Elements stripe={stripePromise}>
        <App />
        </Elements>
    </React.StrictMode>
  </BrowserRouter>
);

