import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Explicitly import autoTable
import '../styles/BillGenerator.css';

const BillGenerator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const products = location.state?.products || [];

    const generateBill = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.text('GOVIGYAAN', 105, 15, { align: 'center' });
        doc.setFontSize(16);
        doc.text('BILL SUMMARY', 105, 30, { align: 'center' });

        // Table Data
        const tableColumn = ['Item Name', 'Price', 'Quantity', 'Subtotal'];
        const tableRows = products.map(product => [
            product.name,
            `₹${product.price}`,
            product.quantity,
            `₹${product.price * product.quantity}`
        ]);

        // Generate Table
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            styles: { halign: 'center' },
            headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
        });

        // Position after the table
        let finalY = doc.lastAutoTable.finalY || 50; // Ensure it's correctly positioned
        finalY += 10;

        // Grand Total
        doc.setFontSize(14);
        doc.text(`Grand Total: ₹${products.reduce((acc, item) => acc + item.price * item.quantity, 0)}`, 105, finalY, { align: 'center' });

        // Thank You Message
        doc.setFontSize(12);
        doc.text('THANK YOU FOR VISITING', 105, finalY + 15, { align: 'center' });

        // Save PDF
        doc.save('bill.pdf');
    };

    return (
        <div className="bill-page">
            <h1>BILL SUMMARY</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>₹{product.price * product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Grand Total: ₹{products.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
            <div className="button-container">
                <button className="bill-button download-btn" onClick={generateBill}>Download PDF</button>
             <button className="bill-button pay-btn" onClick={() => navigate('/payment')}>Proceed to Pay</button>
             <button className="bill-button home-btn" onClick={() => navigate('/')}>Go to Front Page</button>
            </div>
      
        </div>
    );
};

export default BillGenerator;
