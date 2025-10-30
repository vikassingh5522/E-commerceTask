
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const { cartItems, clearCart, getTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const totalPrice = getTotal();
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const orderDetails = {
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    clearCart();
    navigate("/orders", { state: { orderDetails } });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
            Checkout
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between py-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-indigo-600 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-right text-lg font-semibold text-indigo-800 mb-6">
                Total: ${totalPrice.toFixed(2)}
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-transform transform hover:scale-105"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
