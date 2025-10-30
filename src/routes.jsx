import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Clothes from "./pages/Clothes";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import Toys from "./pages/Toys";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useAuth } from "./context/AuthContext"; 


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    
    return <Navigate to="/account" replace />;
  }

  return children;
};


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
         <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;