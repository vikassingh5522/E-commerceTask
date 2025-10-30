import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Orders = () => {
  const location = useLocation();
  const initialOrder = location.state?.orderDetails;

  const [orderDetails, setOrderDetails] = useState(initialOrder);
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000);
  };

  const increaseQty = (id) => {
    const updatedItems = orderDetails.items.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    const newTotal = updatedItems.reduce(
      (sum, i) => sum + i.price * (i.quantity || 1),
      0
    );
    setOrderDetails({ ...orderDetails, items: updatedItems, total: newTotal });
    showPopup("Increased quantity!");
  };

  const decreaseQty = (id) => {
    const updatedItems = orderDetails.items.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    const newTotal = updatedItems.reduce(
      (sum, i) => sum + i.price * (i.quantity || 1),
      0
    );
    setOrderDetails({ ...orderDetails, items: updatedItems, total: newTotal });
    showPopup("Decreased quantity!");
  };

  const removeItem = (id) => {
    const updatedItems = orderDetails.items.filter((item) => item.id !== id);
    const newTotal = updatedItems.reduce(
      (sum, i) => sum + i.price * (i.quantity || 1),
      0
    );
    setOrderDetails({ ...orderDetails, items: updatedItems, total: newTotal });
    showPopup("Item removed!");
  };


  if (!orderDetails) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Orders Found
          </h2>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            Go to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {popupMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all">
          {popupMessage}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
            🛒 Order Summary
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Order Date: {orderDetails.date}
          </p>


          <ul className="divide-y divide-gray-200 mb-6">
            {orderDetails.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.quantity || 1}
                    </p>
                  </div>
                </div>


                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-7 h-7 flex items-center justify-center rounded-full"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity || 1}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full"
                  >
                    +
                  </button>
                  <span className="w-16 text-right text-indigo-600 font-semibold">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-3"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right text-xl font-bold text-indigo-800 border-t pt-4">
            Total: ${orderDetails.total.toFixed(2)}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
