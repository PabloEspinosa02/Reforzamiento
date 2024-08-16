import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { CartProvider } from './pages/CartContext';
import CartModal from './pages/CartModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import FinalizarCompra from './pages/FinalizarCompra'; // Importa tu nuevo componente


const stripePromise = loadStripe('pk_test_51Pi7FSRtNsrVaEeelBYvXzbFEuEHLnLGQIlCyRof72nED6W2aX0XusFSsdPcpLXn43XcF35Yx8lOvPJ44gbKWNVk00EWkWryIT');

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <MainApp isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </Router>
    </CartProvider>
  );
};

interface MainAppProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const MainApp: React.FC<MainAppProps> = ({ isCartOpen, setIsCartOpen }) => {
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  return (
    <div className="app-container">
      <Header setIsCartOpen={setIsCartOpen} isProductsPage={isProductsPage} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Elements stripe={stripePromise}><Checkout /></Elements>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Admin-dashboard' element={<AdminDashboard />} />
          <Route path="/finalizar-compra" element={<FinalizarCompra />} /> {/* Nueva ruta */}


        </Routes>
      </main>
      <Footer />
      <CartModal isOpen={isCartOpen} onRequestClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default App;
