import React from "react";
import { X } from "lucide-react";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-4">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-medium">{item.title}</h4>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;
