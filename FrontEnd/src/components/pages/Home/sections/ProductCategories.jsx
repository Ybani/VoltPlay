import { Button } from '@mui/material';
import { motion } from 'motion/react';
import { ProductCard } from '../../../layout/ProductCard';

const categories = [
    {
        name: 'Gaming Keyboards',
        products: [
            {
                id: 1,
                name: 'RGB Mechanical Keyboard Pro',
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3NjM0NzI0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'Bestseller',
            },
            {
                id: 2,
                name: 'Wireless Gaming Keyboard',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3NjM0NzI0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            },
            {
                id: 3,
                name: 'Compact RGB Keyboard',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3NjM0NzI0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'New',
            },
            {
                id: 4,
                name: 'Pro Esports Keyboard',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3NjM0NzI0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            },
        ],
    },
    {
        name: 'Gaming Mice',
        products: [
            {
                id: 5,
                name: 'Precision Gaming Mouse',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjM0Njc0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'Hot',
            },
            {
                id: 6,
                name: 'Wireless RGB Mouse',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjM0Njc0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
            },
            {
                id: 7,
                name: 'Ultra Light Gaming Mouse',
                price: 69.99,
                image: 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjM0Njc0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'Sale',
            },
            {
                id: 8,
                name: 'Pro FPS Gaming Mouse',
                price: 119.99,
                image: 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjM0Njc0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
            },
        ],
    },
    {
        name: 'Gaming PCs & Monitors',
        products: [
            {
                id: 9,
                name: 'Ultimate Gaming Setup',
                price: 1999.99,
                image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MzM2MjE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'Premium',
            },
            {
                id: 10,
                name: 'RGB Gaming PC',
                price: 1499.99,
                image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MzM2MjE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
            },
            {
                id: 11,
                name: 'High Refresh Monitor',
                price: 399.99,
                image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MzM2MjE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'New',
            },
            {
                id: 12,
                name: 'Streaming PC Bundle',
                price: 1799.99,
                image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc2MzM2MjE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
            },
        ],
    },
    {
        name: 'Consoles & Accessories',
        products: [
            {
                id: 13,
                name: 'Next-Gen Console',
                price: 499.99,
                image: 'https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2MzM2MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'Hot',
            },
            {
                id: 14,
                name: 'Pro Controller',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2MzM2MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
            },
            {
                id: 15,
                name: 'Console Storage Expansion',
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2MzM2MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
            },
            {
                id: 16,
                name: 'VR Gaming Headset',
                price: 299.99,
                image: 'https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2MzM2MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
                badge: 'New',
            },
        ],
    },
];

export function ProductCategories() {
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

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
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
                            >
                                View All
                            </Button>

                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.products.map((product, index) => (
                            <motion.div
                                key={product.id}
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