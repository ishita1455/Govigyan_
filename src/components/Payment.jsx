import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-page">
            <h1>Payment</h1>
            <p>Select your payment method:</p>

            <button onClick={() => alert('Payment Successful!')}>
                💳 Pay via Card
            </button>
            <button onClick={() => alert('Payment Successful!')}>
                🏦 Pay via UPI
            </button>
            <button onClick={() => alert('Payment Successful!')}>
                💰 Pay via Cash
            </button>

            <button onClick={() => navigate('/')}>🏠 Return to Home</button>
        </div>
    );
};

export default Payment;
