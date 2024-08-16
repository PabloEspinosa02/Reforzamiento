import React, { useState } from 'react';
import { useCart } from './CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1); // Aquí definimos el estado para la cantidad seleccionada
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    console.log('Añadiendo al carrito:', {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    });

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
      size: ''
    });

    onClose();
};

const addToCart = (item: CartItem) => {
    console.log('Carrito actual:', cart);
    console.log('Añadiendo al carrito:', item);

    setCart(prevCart => {
        const itemExists = prevCart.find(cartItem => cartItem.id === item.id);
        if (itemExists) {
            console.log('Producto ya existe, sumando cantidad');
            return prevCart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                    : cartItem
            );
        }
        console.log('Nuevo producto, añadiendo al carrito');
        return [...prevCart, { ...item }];
    });
};

  
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-lg mx-auto">
        <div className="relative">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
          <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-64 object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-800 font-bold text-xl mb-4">${product.price}</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600" onClick={handleAddToCart}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
