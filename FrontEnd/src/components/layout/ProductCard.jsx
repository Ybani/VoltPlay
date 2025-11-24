import { ShoppingCart, Heart } from 'lucide-react';
import { IconButton, Chip } from '@mui/material';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ product, onCartUpdate }) {
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'You must login first!',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        try {
            const res = await axios.post("http://localhost:6969/api/users/cart",
                { productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = await Swal.fire({
                title: 'Added to Cart!',
                html: `<p><strong>${product.name}</strong> has been added to your cart.</p>`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'View Cart',
                cancelButtonText: 'Continue Shopping',
                background: '#1a1a24',
                color: '#fff',
            });
            if (result.isConfirmed) navigate('/cart');

            // Notify parent (Header) to refresh cart count
            if (onCartUpdate) onCartUpdate(res.data);

            // Dispatch a global cartUpdated event so Header (or any listener) can refetch and animate
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: {
                    action: 'add',
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                }
            }));

        } catch (err) {
            console.error(err);
            Swal.fire({ icon: 'error', title: 'Failed to add to cart' });
        }
    };

    const handleAddToWishlist = () => {
        Swal.fire({
            title: 'Added to Wishlist!',
            html: `<p><strong>${product.name}</strong> has been saved to your wishlist.</p>`,
            icon: 'success',
            background: '#1a1a24',
            color: '#fff',
            confirmButtonColor: '#dc2626',
            iconColor: '#dc2626',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                popup: 'border border-red-500/30',
            },
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="group relative bg-bg-700 rounded-xl overflow-hidden border border-red-900/30 hover:border-red-500/50 transition-all"
        >


            <div className="relative h-64 overflow-hidden bg-[#0f0f16]">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src={product.productPictures?.[0]?.url || '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1a24] to-transparent opacity-60" />

                {/* Hover Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center gap-3"
                >
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconButton
                            onClick={handleAddToCart}
                            sx={{
                                backgroundColor: '#dc2626',
                                '&:hover': {
                                    backgroundColor: '#b91c1c',
                                },
                            }}
                        >
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </IconButton>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconButton
                            onClick={handleAddToWishlist}
                            sx={{
                                backgroundColor: '#991b1b',
                                '&:hover': {
                                    backgroundColor: '#7f1d1d',
                                },
                            }}
                        >
                            <Heart className="w-5 h-5 text-white" />
                        </IconButton>
                    </motion.div>
                </motion.div>
            </div>

            <div className="p-4">
                <h3 className="text-white mb-2 group-hover:text-red-400 transition-colors">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-2xl bg-linear-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
                    >
                        ${product.price}
                    </motion.span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-linear-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 rounded-lg text-sm transition-all text-white"
                    >
                        Add to Cart
                    </motion.button>
                </div>
            </div>

            {/* RGB Glow Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                animate={{
                    background: [
                        'linear-gradient(to right, rgba(127, 29, 29, 0.1), rgba(220, 38, 38, 0.1), rgba(153, 27, 27, 0.1))',
                        'linear-gradient(to right, rgba(153, 27, 27, 0.1), rgba(127, 29, 29, 0.1), rgba(220, 38, 38, 0.1))',
                        'linear-gradient(to right, rgba(220, 38, 38, 0.1), rgba(153, 27, 27, 0.1), rgba(127, 29, 29, 0.1))',
                    ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </motion.div>
    );
}