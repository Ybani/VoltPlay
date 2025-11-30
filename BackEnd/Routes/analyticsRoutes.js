import express from 'express';
import { getDashboardStats, getRevenueTrend } from '../Controllers/analyticsController.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', getDashboardStats);

// Get revenue trend
router.get('/revenue-trend', getRevenueTrend);

export default router;
