import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductCard from './ProductCard';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import { useRecommendations } from '../../context/RecommendationContext';

function BasedOnPurchases({ limit = 6 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getBasedOnPurchases, purchaseHistory } = useRecommendations();

    useEffect(() => {
        if (purchaseHistory && purchaseHistory.length > 0) {
            fetchRecommendations();
        } else {
            setLoading(false);
        }
    }, [purchaseHistory]);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:6969/api/products');
            const allProducts = response.data.data;

            const recommended = getBasedOnPurchases(allProducts, limit);
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
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400"></div>
                </div>
            </div>
        );
    }

    // Don't show if no purchase history or no recommendations
    if (!purchaseHistory || purchaseHistory.length === 0 || products.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12"
        >
            <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Based on Your Purchases
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default BasedOnPurchases;
