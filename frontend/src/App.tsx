import './App.css'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/menu/ProductList';
import UserList from './components/user/UserList';
import ProductForm from './components/menu/ProductForm';
import Menu from './components/navegacion/Menu';
import LoginForm from './components/login/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';
import CategoryList from './components/category/CategoryList';
import CategoryForm from './components/category/CategoryForm';
import OrderList from './components/order/OrderList';
import OrderForm from './components/order/OrderForm';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Navigate to="/products" />} />
        {/* Rutas protegidas */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/create"
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
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/create"
          element={
            <PrivateRoute>
              <CategoryForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/edit/:id"
          element={
            <PrivateRoute>
              <CategoryForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/create"
          element={
            <PrivateRoute>
              <OrderForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/edit/:id"
          element={
            <PrivateRoute>
              <OrderForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
