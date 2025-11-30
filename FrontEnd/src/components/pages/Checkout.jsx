import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MainLayout from '../layout/MainLayout';
import {
    CreditCard,
    User,
    MapPin,
    Mail,
    Phone,
    Lock,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

function Checkout() {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Form states
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const shipping = 15.00;
    const total = subtotal + tax + shipping;

    // Redirect if cart is empty
    if (cartItems.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
    }

    const handleUserInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;

        // Format card number with spaces
        if (name === 'cardNumber') {
            value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        }

        // Format expiry date
        if (name === 'expiryDate') {
            value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substr(0, 5);
        }

        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleStepOne = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        setStep(3);
        clearCart();
        window.scrollTo(0, 0);
    };

    if (orderPlaced && step === 3) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl w-full text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle2 size={64} className="text-white" />
                        </motion.div>

                        <h1 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h1>
                        <p className="text-gray-400 mb-8 text-lg">
                            Thank you {userInfo.firstName} for your purchase. Your order has been confirmed and will be shipped soon.
                        </p>

                        <div className="bg-[#1a1b23] rounded-2xl p-6 mb-8 text-left">
                            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                            <div className="space-y-2 text-gray-300">
                                <p>Email confirmation sent to: <span className="text-neon-blue">{userInfo.email}</span></p>
                                <p>Total Amount: <span className="text-green-400 font-bold">${total.toFixed(2)}</span></p>
                                <p>Shipping to: <span className="text-white">{shippingAddress.address}, {shippingAddress.city}</span></p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all"
                        >
                            Continue Shopping
                        </button>
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
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/cart')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Cart
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2">
                            {/* Progress Steps */}
                            <div className="mb-8 flex items-center justify-center gap-4">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-neon-blue' : 'text-gray-600'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-neon-blue text-white' : 'bg-gray-800'}`}>
                                        1
                                    </div>
                                    <span className="hidden sm:inline">Information</span>
                                </div>
                                <div className="w-16 h-1 bg-gray-800 rounded">
                                    <div className={`h-full bg-neon-blue rounded transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                                </div>
                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-neon-blue' : 'text-gray-600'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-neon-blue text-white' : 'bg-gray-800'}`}>
                                        2
                                    </div>
                                    <span className="hidden sm:inline">Payment</span>
                                </div>
                            </div>

                            {/* Step 1: User Information */}
                            {step === 1 && (
                                <motion.form
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onSubmit={handleStepOne}
                                    className="space-y-6"
                                >
                                    {/* Personal Information */}
                                    <div className="bg-[#1a1b23] rounded-2xl p-6 border border-gray-800">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                            <User size={24} className="text-neon-blue" />
                                            Personal Information
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                required
                                                value={userInfo.firstName}
                                                onChange={handleUserInfoChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                required
                                                value={userInfo.lastName}
                                                onChange={handleUserInfoChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                required
                                                value={userInfo.email}
                                                onChange={handleUserInfoChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                required
                                                value={userInfo.phone}
                                                onChange={handleUserInfoChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="bg-[#1a1b23] rounded-2xl p-6 border border-gray-800">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                            <MapPin size={24} className="text-neon-blue" />
                                            Shipping Address
                                        </h2>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Street Address"
                                                required
                                                value={shippingAddress.address}
                                                onChange={handleAddressChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    placeholder="City"
                                                    required
                                                    value={shippingAddress.city}
                                                    onChange={handleAddressChange}
                                                    className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="state"
                                                    placeholder="State/Province"
                                                    required
                                                    value={shippingAddress.state}
                                                    onChange={handleAddressChange}
                                                    className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    placeholder="ZIP/Postal Code"
                                                    required
                                                    value={shippingAddress.zipCode}
                                                    onChange={handleAddressChange}
                                                    className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="country"
                                                    placeholder="Country"
                                                    required
                                                    value={shippingAddress.country}
                                                    onChange={handleAddressChange}
                                                    className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all"
                                    >
                                        Continue to Payment
                                    </button>
                                </motion.form>
                            )}

                            {/* Step 2: Payment */}
                            {step === 2 && (
                                <motion.form
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onSubmit={handlePlaceOrder}
                                    className="space-y-6"
                                >
                                    <div className="bg-[#1a1b23] rounded-2xl p-6 border border-gray-800">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                            <CreditCard size={24} className="text-neon-blue" />
                                            Payment Information
                                        </h2>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="cardName"
                                                placeholder="Cardholder Name"
                                                required
                                                value={paymentInfo.cardName}
                                                onChange={handlePaymentChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Card Number"
                                                required
                                                maxLength="19"
                                                value={paymentInfo.cardNumber}
                                                onChange={handlePaymentChange}
                                                className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    placeholder="MM/YY"
                                                    required
                                                    maxLength="5"
                                                    value={paymentInfo.expiryDate}
                                                    onChange={handlePaymentChange}
                                                    className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    placeholder="CVV"
                                                    required
                                                    maxLength="3"
                                                    value={paymentInfo.cvv}
                                                    onChange={handlePaymentChange}
                                                    className="w-full px-4 py-3 bg-[#0a0b09] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                                            <Lock size={16} />
                                            <span>Your payment information is secure and encrypted</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 py-4 bg-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[#1a1b23] rounded-2xl p-6 border border-gray-800 sticky top-24"
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex gap-3">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-medium">{item.name}</p>
                                                <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 border-t border-gray-700 pt-4">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Tax (10%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-700 pt-3">
                                        <div className="flex justify-between text-white text-xl font-bold">
                                            <span>Total</span>
                                            <span className="bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Checkout;
