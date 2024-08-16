const ProductCard = ({ product, onEdit, onDelete }: any) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-5">
      {product.imageUrl && (
        <div className="flex justify-center mb-4">
          <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
        </div>
      )}
      <div className="grid grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <p className="text-gray-700">${product.price}</p>
        </div>
        <div className="flex justify-center items-center">
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
      <div className="flex justify-end mt-4">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
