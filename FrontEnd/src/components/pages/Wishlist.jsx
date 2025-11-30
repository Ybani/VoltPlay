import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import MainLayout from "../layout/MainLayout.jsx";

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId);
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
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-10 h-10 text-red-500" fill="currentColor" />
                            <h1 className="text-5xl font-bold">
                                <span className="bg-linear-to-r from-red-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                                    My Wishlist
                                </span>
                            </h1>
                        </div>
                        <p className="text-gray-400 text-lg">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                        </p>
                    </motion.div>

                    {/* Empty State */}
                    {wishlistItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <Heart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-gray-300 mb-4">
                                Your wishlist is empty
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Start adding products you love by clicking the heart icon!
                            </p>
                            <a
                                href="/"
                                className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all"
                            >
                                Browse Products
                            </a>
                        </motion.div>
                    ) : (
                        /* Wishlist Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wishlistItems.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#1a1b23] rounded-2xl overflow-hidden group"
                                >
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden h-64 bg-[#0f0f16]">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* Remove Button - Top Right */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleRemoveFromWishlist(product._id)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 shadow-lg z-10"
                                        >
                                            <Trash2 size={18} />
                                        </motion.button>

                                        {/* Stock badge */}
                                        {product.stock < 10 && product.stock > 0 && (
                                            <div className="absolute top-4 left-4 bg-orange-500/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                Only {product.stock} left!
                                            </div>
                                        )}
                                        {product.stock === 0 && (
                                            <div className="absolute top-4 left-4 bg-gray-600/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                Out of Stock
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        {/* Brand */}
                                        <p className="text-gray-400 text-sm font-medium mb-1">
                                            {product.brand}
                                        </p>

                                        {/* Product Name */}
                                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* Price and Actions */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold bg-linear-to-r from-red-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                                                ${product.price}
                                            </span>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleAddToCart(product)}
                                                disabled={product.stock === 0}
                                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${product.stock === 0
                                                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-neon-blue to-electric-purple text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
                                                    }`}
                                            >
                                                <ShoppingBag size={16} />
                                                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default Wishlist;
