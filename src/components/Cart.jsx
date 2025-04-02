import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const products = location.state?.products || JSON.parse(localStorage.getItem('savedCart')) || [];

    // Save cart in localStorage before navigating back to QR Scanner
    const handleBackToScan = () => {
        localStorage.setItem('savedCart', JSON.stringify(products));
        navigate('/scan-qr', { state: { products } }); // ✅ Navigates to QRScanner.jsx
    };

    const handleHome = () => {
        navigate('/');
    };

    // Calculate total price
    const calculateTotal = () => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            {products.length > 0 ? (
                <>
                    {products.map((product, index) => (
                        <div key={index} className="product-item">
                            <p>{product.name}</p>
                            <p>Price: ₹{product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Subtotal: ₹{product.price * product.quantity}</p>
                        </div>
                    ))}
                    <h2>Total: ₹{calculateTotal()}</h2>

                    {/* Updated button container for proper alignment */}
                    <div className="button-container">
                        <button onClick={handleHome} className="cart-button">Home</button>
                        <button onClick={handleBackToScan} className="cart-button">Back to Scan</button>
                        <button 
                            onClick={() => navigate('/bill-generator', { state: { products } })}
                            className="cart-button proceed"
                        >
                            Proceed to Bill
                        </button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
