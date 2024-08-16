import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { useCart } from './CartContext'; // Importar el contexto del carrito

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  sizes?: string[]; // Añadir el campo sizes opcional
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart(); // Obtener la función addToCart del contexto

  useEffect(() => {
    axios.get('https://localhost:7105/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setQuantity(1); // Resetear la cantidad al cerrar el modal
  };

  const handleAddToCart = (product: Product, quantity: number, size?: string) => {
    addToCart({ ...product, quantity, size });
    setModalIsOpen(false); // Cerrar el modal después de agregar al carrito
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4 mt-24">
      <h2 className="text-4xl font-bold text-center mb-8">Nuestra Tienda</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentPageData.map(product => (
          <div key={product.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-48 object-contain"/>
            <button
  onClick={() => openModal(product)}
  className="absolute top-2 right-2 bg-transparent p-0 m-0" // Establece el fondo como transparente y elimina márgenes y padding
>
  <img
    src="https://i.postimg.cc/qqx5bb7N/boton-para-acercar.png"
    alt="Vista Previa"
    className="w-8 h-8" // Puedes ajustar el tamaño de la imagen según sea necesario
  />
</button>
            <div className="p-4 grid grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold mt-2">${product.price}</p>
              </div>
              <div className=' flex justify-center items-center text-center '>
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-700 font-bold">Tallas disponibles:</p>
                  <div className="flex space-x-2">
                    {product.sizes.map((size: string) => (
                      <span
                        key={size}
                        className="bg-gray-200 text-gray-700 text-sm font-semibold py-1 px-2 rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </div>
            <div className="p-4 bg-gray-100 ">
              <button onClick={() => handleAddToCart(product, 1)} className="bg-[#23a2a5] text-white px-4 py-2 rounded-full hover:bg-[#248182]">Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 ">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      {selectedProduct && (
        <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Vista Previa"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Sombra en el fondo
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: '90%', // Ajuste de tamaño para dispositivos móviles
      maxWidth: '600px', // Ajuste de tamaño para pantallas grandes
      height: 'auto',
      maxHeight: '80vh',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column', // Cambiar a columna para móvil
      justifyContent: 'center',
      padding: '20px',
      borderRadius: '10px',
    },
  }}
>
  <button onClick={closeModal} className="absolute top-0 right-0 m-4">X</button>
  <img
    src={selectedProduct.imageUrl || 'https://via.placeholder.com/150'}
    alt={selectedProduct.name}
    className="w-full h-auto object-contain mb-4"
  />
  <div className="p-4 w-full flex flex-col justify-center items-center">
    <h2 className="text-2xl font-bold mt-4 text-center">{selectedProduct.name}</h2>
    <p className="text-gray-600 mt-2 text-center">{selectedProduct.description}</p>
    <p className="text-gray-800 font-bold mt-4 text-center">${selectedProduct.price}</p>
    {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
      <div className="mt-4 w-full">
        <label className="block text-gray-700 text-center">Tallas disponibles:</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="border rounded w-full p-2"
        >
          {selectedProduct.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    )}
    <div className="mt-4 w-full">
      <label className="block text-gray-700 text-center">Cantidad:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border rounded w-full p-2"
        min={1}
      />
    </div>
    <button
      onClick={() => handleAddToCart(selectedProduct, quantity, selectedSize)}
      className="bg-[#23a2a5] text-white px-4 py-2 rounded-full hover:bg-[#248182] mt-4 w-full"
    >
      Añadir al Carrito
    </button>
  </div>
</Modal>

     
      )}
    </div>
  );
};

export default Products;
