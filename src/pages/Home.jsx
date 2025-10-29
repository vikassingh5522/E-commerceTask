import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/api";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar"; 
import { CartContext } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  const filtered = products.filter((p) => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !categoryName ||
      categoryName === "all" ||
      p.category?.toLowerCase() === categoryName.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

     
      <h1 className="text-center text-2xl font-semibold mt-8">
        {categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : "Home"}
      </h1>

     
      <div className="flex justify-center mt-4 mb-6">
        <input
          type="text"
          placeholder="Search a product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

     
      <div className="px-6 pb-10">
        {loading ? (
          <Loader />
        ) : (
          <ProductList products={filtered} onAddToCart={addToCart} />
        )}
      </div>
    </div>
  );
};

export default Home;
