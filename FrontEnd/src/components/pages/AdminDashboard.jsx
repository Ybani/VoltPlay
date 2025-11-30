import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MainLayout from '../layout/MainLayout.jsx';
import {
    TrendingUp,
    Users,
    Package,
    DollarSign,
    ShoppingCart,
    Activity,
    BarChart3
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area,
    AreaChart
} from 'recharts';

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:6969/api/analytics/dashboard');
            setStats(res.data.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, title, value, subtitle, color, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="relative overflow-hidden rounded-2xl p-6 shadow-lg"
            style={{
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                border: `1px solid ${color}30`
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                    {subtitle && (
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    )}
                </div>
                <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${color}20` }}
                >
                    <Icon size={24} style={{ color }} />
                </div>
            </div>
            <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                    background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
                    opacity: 0.5
                }}
            />
        </motion.div>
    );

    const RecentOrderRow = ({ order, index }) => {
        const statusColors = {
            completed: '#10b981',
            pending: '#f59e0b',
            processing: '#3b82f6',
            cancelled: '#ef4444'
        };

        return (
            <motion.tr
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
            >
                <td className="p-4 text-sm text-gray-300">{order.orderNumber}</td>
                <td className="p-4 text-sm text-gray-300">{order.customer.name}</td>
                <td className="p-4 text-sm text-gray-300">${order.totalAmount.toFixed(2)}</td>
                <td className="p-4">
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: `${statusColors[order.status]}20`,
                            color: statusColors[order.status]
                        }}
                    >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                </td>
            </motion.tr>
        );
    };

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
                    <p className="text-gray-400 text-sm mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-white font-semibold" style={{ color: entry.color }}>
                            {entry.name}: ${entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Prepare chart data
    const prepareChartData = () => {
        if (!stats || !stats.revenueTrend) return [];

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return stats.revenueTrend.map(item => ({
            month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
            revenue: item.revenue,
            orders: item.orders
        }));
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-[#0a0b09] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Activity className="animate-spin" size={48} color="#3b82f6" />
                        <p className="text-gray-400 text-lg">Loading dashboard...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-[#0a0b09] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-400 text-xl mb-4">{error}</p>
                        <button
                            onClick={fetchDashboardStats}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const chartData = prepareChartData();

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
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">Welcome back! Here's what's happening with your store.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={DollarSign}
                            title="Total Revenue"
                            value={`$${parseFloat(stats.totalRevenue).toLocaleString()}`}
                            subtitle="From completed orders"
                            color="#10b981"
                            delay={0}
                        />
                        <StatCard
                            icon={ShoppingCart}
                            title="Products Sold"
                            value={stats.totalSoldProducts.toLocaleString()}
                            subtitle="Total items sold"
                            color="#3b82f6"
                            delay={0.1}
                        />
                        <StatCard
                            icon={Package}
                            title="Stock Available"
                            value={stats.totalStock.toLocaleString()}
                            subtitle="Total inventory"
                            color="#f59e0b"
                            delay={0.2}
                        />
                        <StatCard
                            icon={Users}
                            title="Registered Users"
                            value={stats.totalUsers.toLocaleString()}
                            subtitle="Active customers"
                            color="#ec4899"
                            delay={0.3}
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Revenue Trend Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp size={24} className="text-green-400" />
                                <h2 className="text-2xl font-bold text-white">Revenue Trend</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="month"
                                        stroke="#9ca3af"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        style={{ fontSize: '12px' }}
                                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                        name="Revenue"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Orders Bar Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 size={24} className="text-blue-400" />
                                <h2 className="text-2xl font-bold text-white">Orders Overview</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="month"
                                        stroke="#9ca3af"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="orders"
                                        fill="#3b82f6"
                                        radius={[8, 8, 0, 0]}
                                        name="Orders"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>

                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <ShoppingCart size={24} className="text-purple-400" />
                                <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
                            </div>
                            <span className="text-sm text-gray-500">Last 10 orders</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left p-4 text-sm font-semibold text-gray-400">Order #</th>
                                        <th className="text-left p-4 text-sm font-semibold text-gray-400">Customer</th>
                                        <th className="text-left p-4 text-sm font-semibold text-gray-400">Amount</th>
                                        <th className="text-left p-4 text-sm font-semibold text-gray-400">Status</th>
                                        <th className="text-left p-4 text-sm font-semibold text-gray-400">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentOrders.map((order, index) => (
                                        <RecentOrderRow key={order._id} order={order} index={index} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminDashboard;
