// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import '../styles/LoginPage.css';

// const LoginPage = () => {
//     const [userName, setUserName] = useState('');
//     const [adminPassword, setAdminPassword] = useState('');
//     const [isAdminMode, setIsAdminMode] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleUserLogin = () => {
//         if (userName.trim() !== '') {
//             localStorage.setItem('userName', userName);
//             navigate('/scan');
//         } else {
//             alert("Please enter your name.");
//         }
//     };

//     const handleAdminLogin = async () => {
//         setIsLoading(true);  // Start loading
//         try {
//             const snapshot = await getDocs(collection(db, 'admins'));
//             const found = snapshot.docs.find(doc => {
//                 const dbPassword = String(doc.data().password).trim();
//                 return dbPassword === adminPassword.trim();
//             });

//             if (found) {
//                 navigate('/admin');
//             } else {
//                 alert('Incorrect admin password.');
//             }
//         } catch (err) {
//             console.error('Error logging in as admin:', err);
//             alert('Something went wrong while logging in.');
//         } finally {
//             setIsLoading(false); // Stop loading
//         }
//     };

//     return (
//         <div className="login-page">
//             <h2>Welcome to the Billing System</h2>

//             <div className="login-options">
//                 <button onClick={() => setIsAdminMode(false)}>User Login</button>
//                 <button onClick={() => setIsAdminMode(true)}>Admin Login</button>
//             </div>

//             {!isAdminMode ? (
//                 <div className="user-login">
//                     <h3>Enter Your Name</h3>
//                     <input
//                         type="text"
//                         placeholder="Your Name"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                     />
//                     <button onClick={handleUserLogin}>Continue</button>
//                 </div>
//             ) : (
//                 <div className="admin-login">
//                     <h3>Admin Login</h3>
//                     <input
//                         type="password"
//                         placeholder="Enter Admin Password"
//                         value={adminPassword}
//                         onChange={(e) => setAdminPassword(e.target.value)}
//                         disabled={isLoading}
//                     />
//                     <button onClick={handleAdminLogin} disabled={isLoading}>
//                         {isLoading ? 'Logging in...' : 'Login'}
//                     </button>
//                     {isLoading && <div className="loader"></div>}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/LoginPage.css';
import logo from '../assets/Govigyan_banner_1.png'; // Adjust the path to your logo

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserLogin = () => {
        if (userName.trim() !== '') {
            localStorage.setItem('userName', userName);
            navigate('/scan');
        } else {
            alert("Please enter your name.");
        }
    };

    const handleAdminLogin = async () => {
        setIsLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'admins'));
            const found = snapshot.docs.find(doc => {
                const dbPassword = String(doc.data().password).trim();
                return dbPassword === adminPassword.trim();
            });

            if (found) {
                navigate('/admin');
            } else {
                alert('Incorrect admin password.');
            }
        } catch (err) {
            console.error('Error logging in as admin:', err);
            alert('Something went wrong while logging in.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <img src={logo} alt="Logo" className="logo" />
            <div className="login-card slide-up">
                <h2>Welcome to the Billing System</h2>

                <div className="login-options">
                    <button onClick={() => setIsAdminMode(false)}>User Login</button>
                    <button onClick={() => setIsAdminMode(true)}>Admin Login</button>
                </div>

                {!isAdminMode ? (
                    <div className="user-login">
                        <h3>Enter Your Name</h3>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button onClick={handleUserLogin}>Continue</button>
                    </div>
                ) : (
                    <div className="admin-login">
                        <h3>Admin Login</h3>
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button onClick={handleAdminLogin} disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        {isLoading && <div className="loader"></div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
