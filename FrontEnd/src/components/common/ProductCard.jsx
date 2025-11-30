import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Check, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useRecommendations } from "../../context/RecommendationContext";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { trackInteraction } = useRecommendations();
    const [added, setAdded] = useState(false);
    const isWishlisted = isInWishlist(product._id);

    const handleAddToCart = () => {
        addToCart(product);
        trackInteraction(product._id, 'cart', product); // Track with product data
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
        trackInteraction(product._id, 'wishlist', product); // Track with product data
    };

    const handleViewDetails = (e) => {
        e.stopPropagation();
        navigate(`/product/${product._id}`);
    };

    return (
        <motion.div
            className="bg-bg-800 rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            {/* Product Image */}
            <div className="relative overflow-hidden h-64 bg-[#0f0f16]">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Wishlist Heart Button - Top Left */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleToggleWishlist}
                    className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${isWishlisted
                        ? 'bg-red-500/90 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                        : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                >
                    <Heart
                        size={20}
                        fill={isWishlisted ? 'currentColor' : 'none'}
                        className="transition-all"
                    />
                </motion.button>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleViewDetails}
                        className="bg-neon-blue text-white p-3 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
                    >
                        <Eye size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="bg-electric-purple text-white p-3 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart size={20} />
                    </motion.button>
                </div>

                {/* Stock badge */}
                {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-magenta/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Only {product.stock} left!
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute top-4 right-4 bg-gray-600/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5">
                {/* Brand */}
                <p className="text-gray-400 text-sm font-medium mb-1">{product.brand}</p>

                {/* Product Name */}
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent">
                        ${product.price}
                    </span>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${product.stock === 0
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : added
                                ? "bg-green-600 text-white"
                                : "bg-gradient-to-r from-neon-blue to-electric-purple text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
                            }`}
                    >
                        {product.stock === 0 ? (
                            "Sold Out"
                        ) : added ? (
                            <>
                                <Check size={16} />
                                Added!
                            </>
                        ) : (
                            "Add to Cart"
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
