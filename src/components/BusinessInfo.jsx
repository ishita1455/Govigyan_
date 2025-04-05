import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Govigyan_banner_1.png';
import '../styles/BusinessInfo.css';

const BusinessInfo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    gstin: '',
    address: '',
    phone: '',
    email: '',
    footerNote: ''
  });

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const docRef = doc(db, 'settings', 'businessInfo');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
    };
    fetchBusinessInfo();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const docRef = doc(db, 'settings', 'businessInfo');
    await setDoc(docRef, form);
    alert('Business info updated!');
  };

  return (
    <div className="view-bills-page">
      {/* ✅ Navbar */}
      <div className="navbar">
        <span className="back-arrow" onClick={() => navigate(-1)}>&larr;</span>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* ✅ Business Info Form Container */}
      <div className="business-info-container">
        <h2>Business Details</h2>

        <form className="business-info-form">
          {Object.entries(form).map(([key, value]) => (
            <div className="form-field" key={key}>
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
          <button type="button" onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default BusinessInfo;
