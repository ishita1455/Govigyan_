import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Cart from './components/Cart';
import BillGenerator from './components/BillGenerator';
import QRScanner from './components/QRScanner';
import Payment from './components/Payment';
import Bills from './components/Bills'; // Ensure this file exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/scan-qr" element={<QRScanner />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bill-generator" element={<BillGenerator />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bills" element={<Bills />} />
      </Routes>
    </Router>
  );
}

export default App;
