import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between text-center sm:text-left">
          <div className="w-full sm:w-1/4 mb-4">
            <h3 className="font-bold mb-2">Navegación</h3>
            <ul>
              <li><a href="/" className="hover:underline">Inicio</a></li>
              <li><a href="/contacto" className="hover:underline">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 mb-4">
            <h3 className="font-bold mb-2">Medios de Pago</h3>
            <div className="flex justify-center sm:justify-start">
              <i className="fab fa-cc-visa m-2 text-xl"></i>
              <i className="fab fa-cc-mastercard m-2 text-xl"></i>
              <i className="fab fa-cc-amex m-2 text-xl"></i>
              <i className="fab fa-cc-paypal m-2 text-xl"></i>
            </div>
          </div>
          <div className="w-full sm:w-1/4 mb-4">
            <h3 className="font-bold mb-2">Contáctanos</h3>
            <p className="mb-1"><i className="fas fa-phone-alt mr-2"></i> 998-881-1900</p>
            <p className="mb-1"><i className="fas fa-envelope mr-2"></i> prensaydifusion@utcancun.edu.mx</p>
            <p className="mb-1"><i className="fas fa-map-marker-alt mr-2"></i> Carretera Cancún-Aeropuerto, Km. 11.5</p>
          </div>
          <div className="w-full sm:w-1/4 mb-4">
            <h3 className="font-bold mb-2">Redes Sociales</h3>
            <div className="flex justify-center sm:justify-start">
              <a href="https://www.instagram.com/utcancun/" className="mr-4 text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="https://www.facebook.com/UTdeCancun" className="mr-4 text-2xl"><i className="fab fa-facebook"></i></a>
              <a href="https://www.tiktok.com/@utcancun" className="mr-4 text-2xl"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024. Todos los derechos reservados. Defensa de las y los consumidores. <a href="#" className="hover:underline"></a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
