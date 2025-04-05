import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import "../styles/InventoryDashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Govigyan_banner_1.png";

const InventoryDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    weight: "",
    price: "",
    stock: "",
    category: "",
    lowStockAlert: "",
    qrCode: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await updateDoc(doc(db, "products", editingProduct.id), newProduct);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...newProduct } : p
        )
      );
      setEditingProduct(null);
    } else {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
    }
    setNewProduct({
      name: "",
      weight: "",
      price: "",
      stock: "",
      category: "",
      lowStockAlert: "",
      qrCode: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  return (
    <div className="inventory-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <button className="back-arrow" onClick={() => navigate("/admin")}>
          ←
        </button>
        <img src={logo} alt="Govigyan Logo" className="logo" />
      </div>

      <div className="inventory-container">
        <header>
          <h2>Admin Inventory Management</h2>
        </header>

        <form className="inventory-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            value={newProduct.weight}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="lowStockAlert"
            placeholder="Low Stock Alert"
            value={newProduct.lowStockAlert}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="qrCode"
            placeholder="QR Code"
            value={newProduct.qrCode}
            onChange={handleChange}
          />
          <button type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="product-list">
          {products.map((p) => (
            <div
              key={p.id}
              className={`product-card ${
                parseInt(p.stock) <= parseInt(p.lowStockAlert)
                  ? "low-stock"
                  : ""
              }`}
            >
              <div className="product-info">
                <strong>{p.name || "Unnamed Product"}</strong>
                <span>₹{p.price || "N/A"}</span>
                <span>Stock: {p.stock || "N/A"}</span>
                <span>Category: {p.category || "N/A"}</span>
                <span>Weight: {p.weight || "N/A"}</span>
                <span>QR: {p.qrCode || "N/A"}</span>
              </div>
              <div className="product-actions">
                <button className="btn update" onClick={() => handleEdit(p)}>
                  Update Stock
                </button>
                <button className="btn delete" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
