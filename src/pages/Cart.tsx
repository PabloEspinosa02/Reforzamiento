import React, { useEffect, useState } from 'react';
import { getCartItems } from '../services/api';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = 1; // Asume un userId fijo para esta versión simplificada
        const response = await getCartItems(userId);
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item: any) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
              {item.size && ` - Talla: ${item.size}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
