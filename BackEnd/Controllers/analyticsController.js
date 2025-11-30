import asyncHandler from 'express-async-handler';
import { User } from '../Models/User.js';
import { Product } from '../Models/Products.js';
import { Order } from '../Models/Order.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/analytics/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
    try {
        // Get total stock (sum of all product stock)
        const products = await Product.find();
        const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);

        // Get total registered users (excluding admins)
        const totalUsers = await User.countDocuments({ isAdmin: false });

        // Get completed orders
        const completedOrders = await Order.find({ status: 'completed' });

        // Calculate total sold products
        const totalSoldProducts = completedOrders.reduce((sum, order) => {
            return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
        }, 0);

        // Calculate total revenue
        const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        // Get recent orders (last 10)
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('orderNumber customer totalAmount status createdAt');

        // Get revenue trend (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const revenueTrend = await Order.aggregate([
            {
                $match: {
                    status: 'completed',
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$totalAmount' },
                    orders: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalStock,
                totalUsers,
                totalSoldProducts,
                totalRevenue: totalRevenue.toFixed(2),
                recentOrders,
                revenueTrend
            }
        });
    } catch (error) {
        res.status(500);
        throw new Error('Error fetching dashboard statistics');
    }
});

/**
 * @desc    Get revenue trend data
 * @route   GET /api/analytics/revenue-trend
 * @access  Private/Admin
 */
export const getRevenueTrend = asyncHandler(async (req, res) => {
    try {
        const { months = 6 } = req.query;

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - parseInt(months));

        const revenueTrend = await Order.aggregate([
            {
                $match: {
                    status: 'completed',
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$totalAmount' },
                    orders: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: revenueTrend
        });
    } catch (error) {
        res.status(500);
        throw new Error('Error fetching revenue trend');
    }
});
