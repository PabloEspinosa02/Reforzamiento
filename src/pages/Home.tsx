import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';
import Footer from '../components/Layout/Footer';

const Home: React.FC = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Para pantallas de tabletas y teléfonos
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  
  return (
    <div>
      <div className="relative h-screen w-full bg-cover bg-center slide-down">
        {/* Imagen para dispositivos móviles */}
        <div className="block md:hidden h-full w-full">
          <img src="https://i.postimg.cc/s2k06sgn/TIENDA.jpg" alt="UT BIS SHOP" className="w-full h-full object-cover" />
        </div>
  
        {/* Video para pantallas grandes */}
        <div className="hidden md:block absolute inset-0 flex justify-center items-center z-0">
          <video 
            className="w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
            controls={false} 
          >
            <source src="/videos/mivideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-4 z-10">
  {showText && (
    <div 
      className="bg-black bg-opacity-90 p-6 md:p-10 rounded animate-fade-in w-full md:w-3/4"
      style={{ marginLeft: '13%' }}  // Ajusta el margen izquierdo
    >
      <h1 className="text-3xl md:text-7xl font-bold mb-2 md:mb-4">BIENVENIDO A UT BIS SHOP</h1>
      <p className="text-base md:text-4xl mb-4">
        Aquí podrás comprar tus artículos favoritos de la UT Cancún: desde prendas hasta accesorios que destacan tu orgullo universitario. ¡Explora y lleva contigo un pedacito de la universidad!
      </p>
    </div>
  )}
</div>



      </div>

      {/* Sección de productos */}
      <div className="p-10">
        <h2 className="title text-3xl font-bold mb-8">Productos Nuevos</h2>
        <Slider {...settings}>
          {/* Productos */}
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Reusable Cups" />
            <p className="mt-2 text-xl">Playera Cuello Redondo</p>
            </div>
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Glass Bottles" />
            <p className="mt-2 text-xl">Playera Cuello Redondo</p>
            </div>
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Insulated Bottles" />
            <p className="mt-2 text-xl">Playera Cuello Redondo</p>
            </div>
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Reusable Cups" />
            <p className="mt-2 text-xl">Playera Cuello Redondo</p>
            </div>
          {/* Agrega más productos según sea necesario */}
        </Slider>
      </div>

      {/* Nueva Sección Testimonial */}
      <div className="testimonial-section flex flex-col items-center text-center p-4">
        <blockquote className="text-lg md:text-xl font-arial">
          Desde botes hasta mochilas, muestra tu espíritu universitario con nuestros productos.
        </blockquote>
        <p className="mt-2 text-sm md:text-base text-gray-600">- UT Cancún</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center bg-gray-100 p-8">
  <div className="w-full md:w-1/2 p-4">
    <img src="https://i.postimg.cc/vm7ZzbkT/edificio-b.jpg" alt="Ubicación" className="w-full h-auto object-cover" />
  </div>
  <div className="w-full md:w-1/2 p-4 text-center md:text-left">
    <h2 className="text-3xl font-bold mb-4">VEN Y UBÍCANOS</h2>
    <p className="text-lg md:text-xl mb-4">Nos encontramos en el edificio B, junto al departamento de actividades culturales y deportivas. Ven y conoce nuestros productos, a un precio accesible, te esperamos.</p>
  </div>
</div>

    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src="https://i.postimg.cc/brhVK3Xz/derechaflecha.png" alt="Next" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src="https://i.postimg.cc/NMprcjS5/izquierdaflecha.png" alt="Previous" />
    </div>
  );
};

export default Home;
