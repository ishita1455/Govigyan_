import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Cart from './components/Cart';
import BillGenerator from './components/BillGenerator';
import QRScanner from './components/QRScanner';
import Payment from './components/Payment';
import Bills from './components/Bills'; // Ensure this file exists
import InventoryDashboard from './components/InventoryDashboard';

import LoginPage from './components/LoginPage';
import Inventory from './components/Inventory';
import AdminPanel from './components/AdminPanel'; // ✅ Import AdminPanel
import ViewBills from './components/ViewBills';
import AddAdmin from './components/AddAdmin';
import LowStockAlert from './components/LowStockAlert';
import BusinessInfo from './components/BusinessInfo';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path ="/business-info" element={<BusinessInfo/>}/> 
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/scan" element={<QRScanner />} />
        <Route path="/bill-generator" element={<BillGenerator />} />
        <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/lowstockalert" element={<LowStockAlert />}/>
        <Route path="/view-bills" element={<ViewBills />} />
        <Route path="/add-admin" element={<AddAdmin />} />  {/* ✅ Admin route */}
      </Routes>
    </Router>
  );
}



export default App;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<FrontPage />} />
//         <Route path="/scan-qr" element={<QRScanner />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/bill-generator" element={<BillGenerator />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/bills" element={<Bills />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
