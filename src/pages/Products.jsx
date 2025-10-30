import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
   
      <Navbar />

     
      <h2 className="text-center text-2xl font-semibold mt-8">
        All Products
      </h2>

      <div className="flex justify-center mt-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="px-6 py-10">
        {loading ? (
          <Loader />
        ) : filtered.length > 0 ? (
          <ProductList
            products={filtered}
            onAddToCart={addToCart}
            cartItems={cartItems} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500 animate-pulse">
            <span className="text-7xl mb-4">🛍️</span>
            <p className="text-lg font-medium">No products available</p>
            <p className="text-sm text-gray-400 mt-1">
              Try searching for something else 🔎
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
