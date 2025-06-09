import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/menu/ProductList';
import UserList from './components/user/UserList';
import ProductForm from './components/menu/ProductForm';
import Menu from './components/navegacion/Menu';
import LoginForm from './components/login/LoginForm';
import CategoryList from './components/category/CategoryList';
import CategoryForm from './components/category/CategoryForm';
import OrderList from './components/order/OrderList';
import OrderForm from './components/order/OrderForm';
import Unauthorized from './components/navegacion/Unauthorized';
import PrivateRoute from './components/auth/PrivateRoute';
import KitchenPage from './components/kitchen/KitchenPage';
import BillingPage from './components/billing/BillingPage';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/products" />} />

        {/* ✅ Grupo de rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/create" element={<ProductForm />} />
          <Route path="/product/edit/:id" element={<ProductForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/category/create" element={<CategoryForm />} />
          <Route path="/category/edit/:id" element={<CategoryForm />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/create" element={<OrderForm />} />
          <Route path="/order/edit/:id" element={<OrderForm />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/billing" element={<BillingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
