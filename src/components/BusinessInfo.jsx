import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/BusinessInfo.css';

const BusinessInfo = () => {
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
    <div className="business-info-page">
      <h2>Business Details</h2>
      <form>
        {Object.entries(form).map(([key, value]) => (
          <div className="form-field" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input name={key} value={value} onChange={handleChange} />
          </div>
        ))}
      </form>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BusinessInfo;
