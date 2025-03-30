import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const products = location.state?.products || [];

    // Calculate total
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
                    <button onClick={() => navigate('/bill-generator', { state: { products } })}>
                        Proceed to Bill
                    </button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
