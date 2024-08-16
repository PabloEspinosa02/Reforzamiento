import React, { useState } from 'react';
import { useCart } from '../../pages/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  setIsCartOpen: (isOpen: boolean) => void;
  isProductsPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ setIsCartOpen, isProductsPage }) => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<header className="fixed top-0 left-0 right-0 p-1 flex items-center bg-[#23a2a5] text-white z-30">
  <div className="flex items-center flex-grow ml-20"> {/* Aumentar el margen izquierdo */}
    <img src="/images/logo1.png" alt="Logo" className="h-10 md:h-20" />
  </div>
  <div className="flex items-center md:hidden">
    <FaBars size={24} onClick={toggleMenu} className="cursor-pointer" />
  </div>
  <nav
    className={`${
      menuOpen ? 'flex' : 'hidden'
    } flex-col md:flex md:flex-row md:flex-grow justify-start space-y-2 md:space-y-0 space-x-0 md:space-x-10 text-lg md:text-2xl ml-10 md:ml-20 absolute md:relative top-full left-0 right-0 bg-[#23a2a5] md:bg-transparent p-4 md:p-0 z-20 md:z-auto`}
  >
    <a href="/" className="transition ease-in-out duration-300 hover:text-gray-400">
      Inicio
    </a>
    <a href="/products" className="transition ease-in-out duration-300 hover:text-gray-400">
      Productos
    </a>
    <a href="http://www.utcancun.edu.mx/" className="transition ease-in-out duration-300 hover:text-gray-400">
      Sitio Oficial
    </a>
  </nav>
  <div className="flex items-center space-x-2 md:space-x-4 text-xl md:text-2xl ml-auto mr-8 md:mr-24"> {/* Ajuste del margen */}
    <a href="/login" className="transition ease-in-out duration-300 hover:text-gray-400 ml-16 md:ml-0"> {/* Aumentar margen izquierdo en móvil */}
      <img src="/images/acceso.png" alt="Acceso" className="h-6 w-6 md:h-8 md:w-8" />
    </a>
    <div className="relative flex items-center cursor-pointer ml-16 md:ml-0" onClick={() => setIsCartOpen(true)}> {/* Aumentar margen izquierdo en móvil */}
      <ShoppingCartIcon fontSize="large" className="transition ease-in-out duration-300 hover:text-gray-400" />
      {cartItemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 md:px-2 py-0.5 text-xs md:text-sm">
          {cartItemCount}
        </span>
      )}
    </div>
  </div>
</header>




  
  );
};

export default Header;
