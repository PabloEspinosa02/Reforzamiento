// FinalizarCompra.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinalizarCompra: React.FC = () => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/'); // O cualquier otra ruta a la que quieras redirigir al usuario
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">¡Compra Finalizada!</h1>
      <p className="text-lg mb-8">Gracias por tu compra.</p>
      <button 
        onClick={handleRegresar}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
      >
        Regresar a la Tienda
      </button>
    </div>
  );
};

export default FinalizarCompra;
