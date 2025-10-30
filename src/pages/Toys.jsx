import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import { CartContext } from "../context/CartContext";
import { getCategories, getProductsByCategory } from "../api/api";

const Toys = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const { data: categories } = await getCategories();
        const toysCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "toys"
        );

        if (!toysCategory) {
          console.warn("🧸 Toys category not found!");
          setProducts([]);
          return;
        }

        const { data } = await getProductsByCategory(toysCategory.id);
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching toys products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToys();
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <div className="min-h-screen bg-gray-50">
   
      <Navbar />

      <h2 className="text-center text-2xl font-semibold mt-8">Toys</h2>

      <div className="flex justify-center mt-4 mb-6">
        <input
          type="text"
          placeholder="Search toys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    
      <div className="px-6 py-10">
        {loading ? (
          <Loader />
        ) : filtered.length > 0 ? (
          <ProductList products={filtered} onAddToCart={addToCart} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500 animate-pulse">
            <span className="text-7xl mb-4">🧸</span>
            <p className="text-lg font-medium">No toys available right now</p>
            <p className="text-sm text-gray-400 mt-1">
              Check back later for new arrivals 
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toys;
