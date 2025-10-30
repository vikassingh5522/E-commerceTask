import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

      <div className="flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-3xl font-bold text-center mb-6">🛒 Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 animate-pulse">
              <span className="text-7xl mb-4">🛍️</span>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">
                Start adding items to see them here ✨
              </p>
              <Link
                to="/"
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            <>
              
              <div className="divide-y divide-gray-200 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4">
                    <CartItem item={item} onRemove={removeFromCart} />
                  </div>
                ))}
              </div>

           
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t pt-4">
                <p className="font-semibold text-xl">
                  Total:{" "}
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </p>
                <Link
                  to="/checkout"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
