// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '' });
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5171/api/products');
    setProducts(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5171/api/users');
    setUsers(response.data);
  };

  const handleAddProduct = async () => {
    await axios.post('http://localhost:5171/api/products', newProduct);
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:5171/api/products/${id}`);
    fetchProducts();
  };

  const handleAddUser = async () => {
    await axios.post('http://localhost:5171/api/auth/register', newUser);
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`http://localhost:5171/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8">Admin Dashboard</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Products</h3>
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
        <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Users</h3>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.username} - {user.email}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default Admin;
