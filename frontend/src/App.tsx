import './App.css'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/menu/ProductList';
import UserList from './components/user/UserList';
import ProductForm from './components/menu/ProductForm';
import Menu from './components/navegacion/Menu';
import LoginForm from './components/login/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Navigate to="/products" />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/new"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
