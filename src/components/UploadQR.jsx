import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/UploadQR.css';
import logo from '../assets/Govigyan_banner_1.png';
import { useNavigate } from 'react-router-dom';

const UploadQRCode = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [qrURL, setQrURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQR = async () => {
      const qrDoc = await getDoc(doc(db, 'storeInfo', 'paymentQR'));
      if (qrDoc.exists()) {
        setQrURL(qrDoc.data().qrURL);
      }
    };
    fetchQR();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setSuccessMsg('');

    try {
      const storageRef = ref(storage, 'qrcodes/upi.png');
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await setDoc(doc(db, 'storeInfo', 'paymentQR'), {
        qrURL: downloadURL,
      });

      setSuccessMsg('✅ QR Code uploaded successfully!');
      setQrURL(downloadURL);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      setSuccessMsg('❌ Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setSuccessMsg('');
    }
  };

  const handleDelete = async () => {
    try {
      const storageRef = ref(storage, 'qrcodes/upi.png');
      await deleteObject(storageRef);
      await setDoc(doc(db, 'storeInfo', 'paymentQR'), { qrURL: '' });
      setQrURL(null);
      setSuccessMsg('🗑️ QR Code removed successfully.');
    } catch (error) {
      console.error('Error deleting QR:', error);
      setSuccessMsg('❌ Failed to remove QR.');
    }
  };

  return (
    <div>
      <div className="navbar">
        <span className="back-arrow" onClick={() => navigate(-1)}>&larr;</span>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="qr-upload-container">
        <h3>{qrURL ? 'Change or Remove QR Code' : 'Upload Store QR Code'}</h3>

        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <button onClick={() => document.getElementById('fileInput').click()}>
          📷 Choose QR
        </button>

        {preview && (
          <div className="qr-preview">
            <img src={preview} alt="Selected QR Preview" />
            <p>Preview of selected QR code</p>
          </div>
        )}

        {qrURL && !preview && (
          <div className="qr-preview">
            <img src={qrURL} alt="Current QR" />
            <p>Current Store QR</p>
          </div>
        )}

        {file && (
          <button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Uploading...' : '⬆️ Upload QR'}
          </button>
        )}

        {qrURL && !preview && (
          <button onClick={handleDelete}>
            🗑️ Remove QR
          </button>
        )}

        {successMsg && <p className="success-msg">{successMsg}</p>}

        {isUploading && <div className="loader"></div>}
      </div>
    </div>
  );
};

export default UploadQRCode;
