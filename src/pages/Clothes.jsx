import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import { CartContext } from "../context/CartContext";
import { getCategories, getProductsByCategory } from "../api/api";

const Clothes = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const { data: categories } = await getCategories();
        const clothesCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "clothes"
        );

        if (!clothesCategory) {
          console.warn(" Clothes category not found!");
          setProducts([]);
          return;
        }

        const { data } = await getProductsByCategory(clothesCategory.id);
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching clothes products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, []);

  
  useEffect(() => {
    const query = search.toLowerCase();
    setFiltered(products.filter((p) => p.title?.toLowerCase().includes(query)));
  }, [search, products]);

  return (
    <div className="min-h-screen bg-gray-50">
   
      <Navbar />

      <h2 className="text-center text-3xl font-semibold mt-8 text-gray-800 tracking-tight">
         Fashion
      </h2>

      <div className="flex justify-center mt-4 mb-6">
        <input
          type="text"
          placeholder="Search clothes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
            <p className="text-lg font-medium">No clothes available right now</p>
            <p className="text-sm text-gray-400 mt-1">
              Please check back later for new fashion arrivals 👕
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clothes;
