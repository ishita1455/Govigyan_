import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Import your Firebase config
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", weight: "", price: "", stock: "", category: "", lowStockAlert: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await updateDoc(doc(db, "products", editingProduct.id), newProduct);
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...newProduct } : p)));
      setEditingProduct(null);
    } else {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
    }
    setNewProduct({ name: "", weight: "", price: "", stock: "", category: "", lowStockAlert: "" });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  return (
    <div className="inventory-dashboard">
      <h2>Inventory Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} required />
        <input type="text" name="weight" placeholder="Weight" value={newProduct.weight} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} required />
        <input type="number" name="lowStockAlert" placeholder="Low Stock Alert" value={newProduct.lowStockAlert} onChange={handleChange} required />
        <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={product.stock <= product.lowStockAlert ? "low-stock" : ""}>
              <td>{product.name}</td>
              <td>{product.weight}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;
