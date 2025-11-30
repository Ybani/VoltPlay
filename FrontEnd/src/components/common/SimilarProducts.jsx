import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';
import { useRecommendations } from '../../context/RecommendationContext';

function SimilarProducts({ currentProduct, limit = 6 }) {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getSimilarProducts } = useRecommendations();

    useEffect(() => {
        if (currentProduct) {
            fetchSimilarProducts();
        }
    }, [currentProduct]);

    const fetchSimilarProducts = async () => {
        try {
            setLoading(true);
            // Fetch all products
            const response = await axios.get('http://localhost:6969/api/products');
            const allProducts = response.data.data;

            // Get similar products
            const similar = getSimilarProducts(currentProduct, allProducts, limit);
            setSimilarProducts(similar);
        } catch (error) {
            console.error('Error fetching similar products:', error);
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

    if (!similarProducts || similarProducts.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12"
        >
            <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-electric-purple" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Similar Products
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {similarProducts.map((product, index) => (
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

export default SimilarProducts;
