import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from './CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IMercadoPagoItem } from '../interfaces/IMercadoPagoItem';

initMercadoPago('TEST-f45a5a82-69b7-4ac0-810d-6e3afbc816e9', {
  locale: "es-MX"
});

const Checkout: React.FC = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCart();
  const [preferenceId, setPreferenceId] = useState<string>('');
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    handlePayment()

    const generatePreferenceId = async () => {
      try {
        const response = await axios.post('/api/payments/create-payment', {
          transactionAmount: total,
          token: 'fake-token',
          description: 'Compra en TiendaUT',
          installments: 1,
          paymentMethodId: 'visa',
          payer: { email: 'payer@example.com' }
        });
        setPreferenceId(response.data.id);
      } catch (error) {
        console.error('Error al generar la preferencia de pago:', error);
      }
    };

    if (total > 0) {
      generatePreferenceId();
    }
  }, [total]);

  const handleIncreaseQuantity = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else {
      removeFromCart(id);
      if (cart.length === 1) { // Si solo queda un producto y se elimina, redirige
        navigate('/products'); // Redirige a la página de productos
      }
    }
  };

  const handleMercadoPago = async (token: string, paymentMethodId: string) => {
    try {
      const response = await axios.post('/api/payments/create-payment', {
        transactionAmount: total,
        token,
        description: 'Compra en TiendaUT',
        installments: 1,
        paymentMethodId,
        payer: { email: 'payer@example.com' }
      });
      setPreferenceId(response.data.id);
    } catch (error) {
      console.error('Error al procesar con MercadoPago:', error);
    }
  };

  const handlePayPal = async () => {
    try {
      const response = await axios.post('/api/payments/create-paypal-order', { amount: total });
      if (response.data && response.data.links) {
        const approvalUrl = response.data.links.find((link: any) => link.rel === "approve").href;
        window.location.href = approvalUrl;
      }
    } catch (error) {
      console.error('Error al procesar con PayPal:', error);
    }
  };

  const handlePayment = async () => {
    const preferenceId = await createPreference();
    if (preferenceId) {
      setPreferenceId(preferenceId)
      console.log('ID obtenido:', preferenceId);
    }
  }
  const navigate = useNavigate();

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    if (cart.length === 1) { // Si solo queda un producto y se elimina, redirige
      navigate('/products');
    }
  };


  const createPreference = async () => {
    try {
      const postData: IMercadoPagoItem[] = cart.map((item) => ({
        id: item.id.toString(),
        title: item.name,
        description: item.size > 0 ? `Talla: ${item.size}` : 'Sin talla',
        pictureUrl: item.imageUrl,
        quantity: item.quantity,
        unitPrice: Math.round(Number(item.price)), 
      }));

      console.log(postData);
      
      const response = await axios.post('https://localhost:7105/api/Payments/create-preference', postData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
      console.log(response.data);
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row max-w-6xl w-full">
        {/* Carrito de Compras */}
        <div className="w-full md:w-2/3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Carrito de compras</h2>
            <a href="/" className="text-blue-500">Continuar compra</a>
          </div>
          <div>
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">${item.price}</span>
                  <div className="flex items-center">
                    <button 
                      className="text-gray-500"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      className="text-gray-500"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <button 
  className="text-red-500 hover:text-red-700"
  onClick={() => handleRemoveFromCart(item.id)} // Llamada a la función
>
  <img src="https://i.postimg.cc/j2mXHZDJ/bote-de-basura.png" alt="Eliminar" className="w-6 h-6" />
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Detalles de Pago */}
        <div className="w-full md:w-1/3 bg-black text-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none p-6">
          <h2 className="text-xl font-semibold mb-4">Opciones de pago</h2>
          <div className="mb-4">
            <label className="block mb-1">Metodos de pago</label>
            <div className="flex space-x-4">
              <img src="https://i.postimg.cc/wRTcWHzf/visa.png" alt="Visa" className="h-8" />
              <img src="https://i.postimg.cc/RqMRC1t7/paypal.png" alt="PayPal" className="h-8" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Total</label>
            <p className="text-lg font-semibold">${total}</p>
          </div>

          <div className="flex flex-col space-y-4 mb-6">
 
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
            <PayPalScriptProvider options={{
              clientId: "AU9UVcWCW38gPF0aYqqB1KUsRj7eLP4EvOTraH98yH0j-cwFxkEo2qQV17t6rPH67p8B5bTHRsXiZ597",
              "enable-funding": "venmo",
              country: "MX",
              currency: "MXN"
            }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={async () => {
                  try {
                    const response = await fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ cart }),
                    });
                    const orderData = await response.json();
                    if (orderData.id) return orderData.id;
                    throw new Error("Failed to create order");
                  } catch (error) {
                    console.error(error);
                    setMessage(`Could not initiate PayPal Checkout...${error}`);
                  }
                }}
                onApprove={async (data, _actions) => {
                  try {
                    const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    });
                    const orderData = await response.json();
                    const transaction = orderData.purchase_units[0].payments.captures[0];
                    setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
                  } catch (error) {
                    console.error(error);
                    setMessage(`Sorry, your transaction could not be processed...${error}`);
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
          
          {paymentCompleted && <p>Pago completado con éxito</p>}
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
