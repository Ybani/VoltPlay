import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../common/ProductCard";
import MainLayout from "../layout/MainLayout.jsx";

function Console() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:6969/api/products?category=consoles");
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching consoles:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent">
                Gaming Consoles
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Next-gen gaming consoles and portable gaming systems
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-electric-purple"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center text-red-400 py-12">
              <p>{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 px-6 py-2 bg-electric-purple text-white rounded-lg hover:bg-purple-600 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {products.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p>No products available at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Console;