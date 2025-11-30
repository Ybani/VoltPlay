import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../../common/ProductCard'; // Using the shared ProductCard component

export function ProductCategories() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:6969/api/products');
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Helper to filter products by category and limit to 4
    const getCategoryProducts = (categoryName) => {
        return products
            .filter(p => p.category === categoryName)
            .slice(0, 4);
    };

    const categories = [
        {
            id: 'keyboards',
            title: 'Gaming Keyboards',
            items: getCategoryProducts('keyboards'),
            path: '/keyboards'
        },
        {
            id: 'mice',
            title: 'Gaming Mice',
            items: getCategoryProducts('mice'),
            path: '/mice'
        },
        {
            id: 'monitors',
            title: 'Gaming Monitors',
            items: getCategoryProducts('monitors'),
            path: '/pcs-monitors'
        },
        {
            id: 'consoles',
            title: 'Consoles',
            items: getCategoryProducts('consoles'),
            path: '/consoles'
        },
        {
            id: 'audio',
            title: 'Audio & Headsets',
            items: getCategoryProducts('audio'),
            path: '/audio'
        }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neon-blue"></div>
            </div>
        );
    }

    return (
        <div className="py-16 px-6">
            {categories.map((category, categoryIndex) => (
                category.items.length > 0 && (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        className="mb-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <motion.h2
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-4xl bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent font-bold drop-shadow-[0_0_8px_var(--color-neon-blue)]"
                            >
                                {category.title}
                            </motion.h2>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate(category.path)}
                                    sx={{
                                        borderColor: '#ef4444', // neon-red
                                        color: 'white',
                                        textTransform: 'none',
                                        '&:hover': {
                                            borderColor: '#ef4444',
                                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                        },
                                        boxShadow: '0 0 8px #ef4444',
                                    }}
                                >
                                    View All
                                </Button>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {category.items.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )
            ))}
        </div>
    );
}