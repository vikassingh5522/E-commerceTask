
import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Orders = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

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
              <li key={item.id} className="flex justify-between py-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
                <span className="text-indigo-600 font-medium">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="text-right text-xl font-bold text-indigo-800">
            Total Paid: ${orderDetails.total.toFixed(2)}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
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
