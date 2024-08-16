import React from 'react';
import axios from 'axios';

const PaymentSuccess: React.FC = () => {
  const handleDownloadReceipt = async () => {
    try {
      const response = await axios.get('/api/receipt/generate-receipt', {
        responseType: 'blob', // importante para manejar la descarga de archivos
        params: { orderId: '12345' } // Reemplaza con el ID real de la orden
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recibo.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error descargando el recibo:', error);
    }
  };

  return (
    <div>
      <h1>Pago Exitoso</h1>
      <p>Tu pago ha sido procesado correctamente.</p>
      <button onClick={handleDownloadReceipt}>Descargar Recibo</button>
      <a href="/">Volver a la página principal</a>
    </div>
  );
};

export default PaymentSuccess;
