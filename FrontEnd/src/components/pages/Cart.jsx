import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import MainLayout from '../layout/MainLayout';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    if (cartItems.length === 0) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <ShoppingBag size={80} className="mx-auto mb-6 text-gray-600" />
                        <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-400 mb-8">Add some awesome gaming gear to get started!</p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all"
                        >
                            Continue Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-400">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-2xl p-6 flex gap-6"
                                >
                                    {/* Product Image */}
                                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">{item.brand}</p>
                                                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-500">${item.price} each</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Clear Cart Button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={clearCart}
                                className="w-full py-3 text-red-400 hover:text-red-300 font-semibold transition-colors"
                            >
                                Clear Cart
                            </motion.button>
                        </div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-2xl p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Tax (10%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-700 pt-4">
                                        <div className="flex justify-between text-white text-xl font-bold">
                                            <span>Total</span>
                                            <span className="bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full py-4 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all mb-4"
                                >
                                    Proceed to Checkout
                                </button>

                                <Link
                                    to="/"
                                    className="block text-center text-gray-400 hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Cart;
