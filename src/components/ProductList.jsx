import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onAddToCart, cartItems }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
          cartItems={cartItems} 
        />
      ))}
    </div>
  );
};

export default ProductList;
