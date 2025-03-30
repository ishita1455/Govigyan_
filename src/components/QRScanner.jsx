import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import '../styles/QRScanner.css';

const QRScanner = () => {
    const [products, setProducts] = useState([]);
    const scannerRef = useRef(null);
    const navigate = useNavigate();
    const isScannerRunning = useRef(false);

    // Product List
    const productList = {
        "P001": { name: "GOvigyan Shampoo", price: 150, category: "govigyan" },
        "P002": { name: "Ghee", price: 160, category: "govigyan" },
        "M101": { name: "Medicinal Syrup", price: 120, category: "medicinal" },
        "M102": { name: "Medicinal Tablets", price: 90, category: "medicinal" }
    };

    // Handle Scanned Product
    const handleScanSuccess = (decodedText) => {
        const id = decodedText.trim();

        if (productList[id]) {
            setProducts(prevProducts => {
                const existingProduct = prevProducts.find(p => p.id === id);
                if (existingProduct) {
                    // Increase quantity if product is already in the cart
                    return prevProducts.map(p =>
                        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                } else {
                    // Add new product
                    return [...prevProducts, {
                        id,
                        name: productList[id].name,
                        price: productList[id].price,
                        category: productList[id].category,
                        quantity: 1,
                    }];
                }
            });
        } else {
            alert(`Product with ID ${id} not found`);
        }
    };

    // Handle Scanner Errors
    const handleScanFailure = (error) => {
        console.warn(`QR scan error: ${error}`);
    };

    // Increase Quantity Manually
    const increaseQuantity = (id) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            )
        );
    };

    // Decrease Quantity Manually
    const decreaseQuantity = (id) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            )
        );
    };

    // Remove Product from Cart
    const removeProduct = (id) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    };

    // Start Scanner
    useEffect(() => {
        const startScanner = async () => {
            try {
                if (!scannerRef.current) {
                    scannerRef.current = new Html5Qrcode("reader");
                    isScannerRunning.current = true;

                    await scannerRef.current.start(
                        { facingMode: "environment" },
                        { fps: 10, qrbox: { width: 250, height: 250 } },
                        handleScanSuccess,
                        handleScanFailure
                    );

                    console.log("Scanner started.");
                }
            } catch (error) {
                console.error('Camera start failed:', error);
            }
        };

        startScanner();

        return () => {
            const stopScanner = async () => {
                if (scannerRef.current && isScannerRunning.current) {
                    try {
                        await scannerRef.current.stop();
                        console.log("Scanner stopped.");
                        scannerRef.current = null;
                        isScannerRunning.current = false;
                    } catch (err) {
                        console.warn("Scanner stop failed:", err);
                    }
                }
            };

            stopScanner();
        };
    }, []);

    return (
        <div className="scanner-page">
            <button className="home-btn" onClick={() => navigate('/')}>🏠 Home</button>
            <h1>Scan Product QR Code</h1>
            <div id="reader"></div>

            {/* Shopping Cart */}
            <div className="cart">
                <h2>Shopping Cart</h2>
                {products.length === 0 ? (
                    <p>Cart is empty.</p>
                ) : (
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                <strong>{product.name}</strong>  
                                <br />
                                Price: ₹{product.price}  
                                <br />
                                Quantity:  
                                <button className="quantity-btn" onClick={() => decreaseQuantity(product.id)}>-</button>
                                {product.quantity}
                                <button className="quantity-btn" onClick={() => increaseQuantity(product.id)}>+</button>
                                <br />
                                Subtotal: ₹{product.price * product.quantity}  
                                <br />
                                <button className="remove-btn" onClick={() => removeProduct(product.id)}>Remove</button>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
                {products.length > 0 && (
                    <button className="checkout-btn" onClick={() => navigate('/cart', { state: { products } })}>
                        Proceed to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default QRScanner;
