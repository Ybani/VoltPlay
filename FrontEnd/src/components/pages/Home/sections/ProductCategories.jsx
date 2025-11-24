import { Button } from '@mui/material';
import { motion } from 'motion/react';
import { ProductCard } from '../../../layout/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export function ProductCategories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get('http://localhost:6969/api/products')
            .then((res) => {
                // group by category
                const grouped = res.data.reduce((acc, product) => {
                    const cat = product.category || 'Uncategorized';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(product);
                    return acc;
                }, {});

                // convert to array and limit 4 products per category
                const categoriesArr = Object.entries(grouped).map(([name, products]) => ({
                    name,
                    products: products.slice(0, 4),
                }));

                setCategories(categoriesArr);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="py-16 px-6">
            {categories.map((category, categoryIndex) => (
                <motion.div
                    key={categoryIndex}
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
                            {category.name}
                        </motion.h2>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: 'var(--color-neon-red)',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: 'var(--color-neon-red)',
                                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                    },
                                    boxShadow: '0 0 8px var(--color-neon-red)',
                                }}
                                onClick={() => navigate(`/${category.name}`)}
                            >
                                View All
                            </Button>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.products.map((product, index) => (
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
            ))}
        </div>
    );
}
