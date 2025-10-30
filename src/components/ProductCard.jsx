import React from "react";
import { PlusCircle } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">{product.category.name}</p>
        <h3 className="text-md font-semibold truncate">{product.title}</h3>
        <p className="text-gray-800 font-bold mt-1">${product.price}</p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
      >
        <PlusCircle className="text-gray-700 w-6 h-6" />
      </button>
    </div>
  );
};

export default ProductCard;
