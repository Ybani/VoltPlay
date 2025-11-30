import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRecommendations } from '../../context/RecommendationContext';
import MainLayout from '../layout/MainLayout';
import {
    TrendingUp,
    MousePointerClick,
    Eye,
    Target,
    Users,
    Clock,
    Search,
    ShoppingCart,
    BarChart3
} from 'lucide-react';
import axios from 'axios';

function AdminAIInsights() {
    const { getAnalytics } = useRecommendations();
    const [analytics, setAnalytics] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const analyticsData = getAnalytics();
            setAnalytics(analyticsData);

            // Fetch product details for top recommended
            if (analyticsData.topRecommended.length > 0) {
                const response = await axios.get('http://localhost:6969/api/products');
                const allProducts = response.data.data;

                const productsWithDetails = analyticsData.topRecommended.map(item => {
                    const product = allProducts.find(p => p._id === item.productId);
                    return {
                        ...item,
                        productName: product?.name || 'Unknown Product',
                        productBrand: product?.brand || '-',
                        productPrice: product?.price || 0
                    };
                });
                setTopProducts(productsWithDetails);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neon-blue"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0a0b09] p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                            🎯 Tableau de Bord AI - Recommandations
                        </h1>
                        <p className="text-gray-400">Performance du système de recommandations intelligentes</p>
                    </motion.div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Impressions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Eye className="w-8 h-8 text-blue-400" />
                                <span className="text-blue-400 text-sm font-semibold">Impressions</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                                {analytics?.totalImpressions || 0}
                            </h3>
                            <p className="text-gray-400 text-sm">Produits affichés</p>
                        </motion.div>

                        {/* Total Clicks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <MousePointerClick className="w-8 h-8 text-purple-400" />
                                <span className="text-purple-400 text-sm font-semibold">Clics</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                                {analytics?.totalClicks || 0}
                            </h3>
                            <p className="text-gray-400 text-sm">Interactions utilisateur</p>
                        </motion.div>

                        {/* Click-Through Rate */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Target className="w-8 h-8 text-green-400" />
                                <span className="text-green-400 text-sm font-semibold">CTR</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                                {analytics?.overallCTR || 0}%
                            </h3>
                            <p className="text-gray-400 text-sm">Taux de clics</p>
                        </motion.div>

                        {/* Avg User Engagement */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Clock className="w-8 h-8 text-pink-400" />
                                <span className="text-pink-400 text-sm font-semibold">Engagement</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                                {analytics?.userBehavior.avgViewTime || 0}s
                            </h3>
                            <p className="text-gray-400 text-sm">Temps moyen/produit</p>
                        </motion.div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Section Performance */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#1a1b23] border border-gray-800 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-neon-blue" />
                                Performance par Section
                            </h2>

                            <div className="space-y-4">
                                {analytics?.sectionStats && analytics.sectionStats.length > 0 ? (
                                    analytics.sectionStats.map((section, index) => (
                                        <div key={index} className="bg-[#0f0f16] rounded-lg p-4 border border-gray-700">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-lg font-semibold text-white capitalize">
                                                    {section.section}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${section.ctr > 5 ? 'bg-green-500/20 text-green-400' :
                                                        section.ctr > 2 ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    CTR: {section.ctr}%
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-400">Impressions:</span>
                                                    <span className="text-white ml-2 font-semibold">{section.impressions}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Clics:</span>
                                                    <span className="text-white ml-2 font-semibold">{section.clicks}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-400 py-8">
                                        Aucune donnée disponible
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* User Behavior Insights */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-[#1a1b23] border border-gray-800 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Users className="w-6 h-6 text-electric-purple" />
                                Comportement Utilisateur
                            </h2>

                            <div className="space-y-4">
                                <div className="bg-[#0f0f16] rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Search className="w-5 h-5 text-blue-400" />
                                        <span className="text-gray-400">Recherches totales</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{analytics?.userBehavior.totalSearches || 0}</p>
                                </div>

                                <div className="bg-[#0f0f16] rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Eye className="w-5 h-5 text-purple-400" />
                                        <span className="text-gray-400">Produits consultés</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{analytics?.userBehavior.totalViews || 0}</p>
                                </div>

                                <div className="bg-[#0f0f16] rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShoppingCart className="w-5 h-5 text-green-400" />
                                        <span className="text-gray-400">Achats effectués</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{analytics?.userBehavior.totalPurchases || 0}</p>
                                </div>

                                <div className="bg-[#0f0f16] rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="w-5 h-5 text-pink-400" />
                                        <span className="text-gray-400">Temps moyen/produit</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{analytics?.userBehavior.avgViewTime || 0}s</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Top Recommended Products */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-[#1a1b23] border border-gray-800 rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-neon-blue" />
                            Produits les Plus Recommandés
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">#</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Produit</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Marque</th>
                                        <th className="text-right py-3 px-4 text-gray-400 font-semibold">Impressions</th>
                                        <th className="text-right py-3 px-4 text-gray-400 font-semibold">Clics</th>
                                        <th className="text-right py-3 px-4 text-gray-400 font-semibold">CTR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts && topProducts.length > 0 ? (
                                        topProducts.map((item, index) => (
                                            <tr key={item.productId} className="border-b border-gray-800 hover:bg-[#0f0f16] transition-colors">
                                                <td className="py-4 px-4 text-gray-400">#{index + 1}</td>
                                                <td className="py-4 px-4 text-white font-medium">{item.productName}</td>
                                                <td className="py-4 px-4 text-gray-300">{item.productBrand}</td>
                                                <td className="py-4 px-4 text-right text-blue-400 font-semibold">{item.impressions}</td>
                                                <td className="py-4 px-4 text-right text-purple-400 font-semibold">{item.clicks}</td>
                                                <td className="py-4 px-4 text-right">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.ctr > 5 ? 'bg-green-500/20 text-green-400' :
                                                            item.ctr > 2 ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-gray-500/20 text-gray-400'
                                                        }`}>
                                                        {item.ctr}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-8 text-center text-gray-400">
                                                Aucune donnée de recommandation disponible
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminAIInsights;
