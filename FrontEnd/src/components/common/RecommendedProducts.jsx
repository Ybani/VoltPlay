import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

function RecommendedProducts({ title = "Recommended for You", limit = 8, getProductsFunction }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecommendations();
    }, [getProductsFunction]);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            // Fetch all products
            const response = await axios.get('http://localhost:6969/api/products');
            const allProducts = response.data.data;

            // Get recommendations using provided function
            const recommended = getProductsFunction(allProducts, limit);
            setProducts(recommended);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-neon-blue"></div>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12"
        >
            <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-neon-blue" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {title}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export default RecommendedProducts;
