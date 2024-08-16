import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
import ProductForm from '../components/Admin/ProductForm';
import ProductCard from '../components/Admin/ProductCard';
import IProducts from '../interfaces/IProducts';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await getProducts();
    console.log(products.data);
    
    setProducts(products.data);
  };

  const handleAddProduct = async (product: Omit<IProducts, 'id'>) => {
    await addProduct(product);
    fetchProducts();
  };

  const handleUpdateProduct = async (product: IProducts) => {

    const productActualizado = {
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        sizes : product.sizes
    }

    await updateProduct(product.id, productActualizado);
    fetchProducts();
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  return (
    <div className="container py-36 min-h-screen mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Administrar Productos</h1>
      <div className="mb-4">
        <ProductForm
          onSubmit={handleAddProduct}
          onUpdate={handleUpdateProduct}
          product={editingProduct}
          onCancel={() => setEditingProduct(null)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => setEditingProduct(product)}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
