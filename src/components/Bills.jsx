import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Bills.css';

const Bills = () => {
  const navigate = useNavigate();

  const previousBills = [
    { id: 1, date: 'March 29, 2025', amount: 240 },
    { id: 2, date: 'March 28, 2025', amount: 450 },
  ];

  return (
    <div className="bills-page">
      <h1>Previous Bills</h1>
      <div className="bill-list">
        {previousBills.length > 0 ? (
          previousBills.map(bill => (
            <div key={bill.id} className="bill-item">
              <p><strong>Date:</strong> {bill.date}</p>
              <p><strong>Amount:</strong> ₹{bill.amount}</p>
              <button className="download-btn">📥 Download</button>
            </div>
          ))
        ) : (
          <p>No previous bills found.</p>
        )}
      </div>
      <button className="home-btn" onClick={() => navigate('/')}>🏠 Home</button>
    </div>
  );
};

export default Bills;
