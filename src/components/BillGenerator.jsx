import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import '../styles/BillGenerator.css';

const BillGenerator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const products = location.state?.products || [];

    const generateBill = () => {
        const doc = new jsPDF();
        doc.text('Bill Summary', 20, 20);
        let yOffset = 30;

        products.forEach((product, index) => {
            doc.text(`${index + 1}. ${product.name} - ₹${product.price} x ${product.quantity} = ₹${product.price * product.quantity}`, 20, yOffset);
            yOffset += 10;
        });

        doc.text(`Grand Total: ₹${products.reduce((acc, item) => acc + item.price * item.quantity, 0)}`, 20, yOffset + 10);
        doc.save('bill.pdf');
    };

    return (
        <div className="bill-page">
            <h1>Bill Summary</h1>
            <button onClick={generateBill}>Download PDF</button>
            <button onClick={() => navigate('/payment')}>Proceed to Pay</button>
        </div>
    );
};

export default BillGenerator;
