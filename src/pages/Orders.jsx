import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_BASE = "https://api.escuelajs.co/api/v1";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form, setForm] = useState({ fullName: "", address: "", total: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

 
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const updated = await Promise.all(
          orders.map(async (o) => {
            if (!o.productId) return o;
            const res = await fetch(`${API_BASE}/products/${o.productId}`);
            const p = await res.json();
            return { ...o, item: p.title, total: p.price };
          })
        );
        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
      } catch (err) {
        console.error("Error fetching prices:", err);
      } finally {
        setLoading(false);
      }
    };
    orders.length ? fetchPrices() : setLoading(false);
  }, [orders.length]);

 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const saveEdit = (id) => {
    updateOrders(orders.map((o) => (o.id === id ? { ...o, ...form } : o)));
    setEditingOrder(null);
  };

  const deleteOrder = (id) => updateOrders(orders.filter((o) => o.id !== id));

  const deleteAll = () => {
    if (window.confirm("Delete all orders?")) {
      localStorage.removeItem("orders");
      setOrders([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-3xl flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Orders</h1>
          {!!orders.length && (
            <button
              onClick={deleteAll}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
            >
              Remove All
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500 mt-10">Loading latest prices...</p>
        ) : !orders.length ? (
          <div className="text-center mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076502.png"
              alt="No Orders"
              className="w-40 h-40 mx-auto mb-4 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No Orders Yet 😔
            </h2>
            <p className="text-gray-500 mt-2">
              Start shopping to see your orders here!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 w-full max-w-3xl">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
              >
                {editingOrder === o.id ? (
                  <div className="space-y-3">
                    {["fullName", "address", "total"].map((f) => (
                      <input
                        key={f}
                        name={f}
                        type={f === "total" ? "number" : "text"}
                        value={form[f]}
                        onChange={handleChange}
                        placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                        className="border p-2 w-full rounded-lg"
                      />
                    ))}
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => saveEdit(o.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrder(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{o.id}</h3>
                      <p className="text-gray-600">{o.item}</p>
                      <p className="text-sm text-gray-500">Date: {o.date}</p>
                      <p className="text-sm text-gray-500">Name: {o.fullName}</p>
                      <p className="text-sm text-gray-500">Address: {o.address}</p>
                      <p className="text-sm text-gray-500">Email: {o.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-blue-600">${o.total}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingOrder(o.id);
                            setForm({
                              fullName: o.fullName,
                              address: o.address,
                              total: o.total,
                            });
                          }}
                          className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteOrder(o.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
