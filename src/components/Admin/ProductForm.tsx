import { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, product, onCancel, onUpdate }: any) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [hasSizes, setHasSizes] = useState(false);
  const [sizes, setSizes] = useState({
    CH: false,
    M: false,
    G: false,
    XL: false,
    XXL: false,
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setUrlImage(product.imageUrl);
      setHasSizes(product.sizes && product.sizes.length > 0);
      if (product.sizes) {
        const updatedSizes = { ...sizes };
        product.sizes.forEach(size => {
          if (updatedSizes.hasOwnProperty(size)) {
            updatedSizes[size] = true;
          }
        });
        setSizes(updatedSizes);
      }
    } else {
      setName('');
      setPrice(0);
      setDescription('');
      setUrlImage('');
      setHasSizes(false);
      setSizes({
        CH: false,
        M: false,
        G: false,
        XL: false,
        XXL: false,
      });
    }
  }, [product]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selectedSizes = Object.keys(sizes).filter(size => sizes[size]);
    onSubmit({ 
      id: product?.id, 
      name, 
      price, 
      description, 
      imageUrl: urlImage, 
      sizes: hasSizes ? selectedSizes : null 
    });
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    const selectedSizes = Object.keys(sizes).filter(size => sizes[size]);
    onSubmit({ 
      name, 
      price, 
      description, 
      imageUrl: urlImage, 
      sizes: hasSizes ? selectedSizes : null 
    });
    resetForm();
  }

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const selectedSizes = Object.keys(sizes).filter(size => sizes[size]);
    console.log(selectedSizes);
    
    onUpdate({ 
      id: product.id, 
      name, 
      price, 
      description, 
      imageUrl: urlImage, 
      sizes: selectedSizes 
    });
    resetForm();
  }

  const resetForm = () => {
    setName('');
    setPrice(0);
    setDescription('');
    setUrlImage('');
    setHasSizes(false);
    setSizes({
      CH: false,
      M: false,
      G: false,
      XL: false,
      XXL: false,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">URL de la Imagen</label>
        <input
          type="text"
          value={urlImage}
          onChange={(e) => setUrlImage(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={hasSizes}
          onChange={(e) => setHasSizes(e.target.checked)}
          className="mr-2"
        />
        <label className="text-gray-700 form-checkbox ">¿El producto tiene tallas?</label>
      </div>
      {hasSizes && (
        <div className="mb-4">
          {Object.keys(sizes).map(size => (
            <label key={size} className="inline-flex items-center mr-2 mb-2">
              <input
                type="checkbox"
                checked={sizes[size]}
                onChange={(e) => setSizes({ ...sizes, [size]: e.target.checked })}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={product ? handleUpdate : handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {product ? 'Actualizar' : 'Agregar'}
        </button>
        {product && (
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
