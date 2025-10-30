import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = "https://api.escuelajs.co/api/v1";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product || null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, address } = formData;

    if (!fullName || !email || !address) {
      alert("⚠️ Please fill all fields before placing the order.");
      return;
    }

   
    let productData = null;
    if (product?.id) {
      const res = await fetch(`${API_BASE}/products/${product.id}`);
      productData = await res.json();
    }

 
    const newOrder = {
      id: Date.now(),
      productId: productData?.id || null,
      item: productData?.title || "Unknown Item",
      total: productData?.price || 0,
      fullName,
      email,
      address,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    navigate("/orders");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🛍️ Checkout</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Please fill in your details to complete your order.
          </p>
        </div>

        {product && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
            <p className="text-gray-600 text-sm mt-1">${product.price}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="123 Main Street, City, Country"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            Place Order
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          🔒 Your information is securely encrypted.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
