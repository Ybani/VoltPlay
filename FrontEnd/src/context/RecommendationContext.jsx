import React, { createContext, useContext, useState, useEffect } from 'react';

const RecommendationContext = createContext();

export const useRecommendations = () => {
    const context = useContext(RecommendationContext);
    if (!context) {
        throw new Error('useRecommendations must be used within RecommendationProvider');
    }
    return context;
};

export const RecommendationProvider = ({ children }) => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [bestSellers, setBestSellers] = useState({});
    const [viewHistory, setViewHistory] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [analytics, setAnalytics] = useState({
        recommendationImpressions: {}, // {productId: count}
        recommendationClicks: {}, // {productId: count}
        sectionPerformance: {}, // {sectionName: {impressions, clicks}}
        lastUpdated: Date.now()
    });
    const [userProfile, setUserProfile] = useState({
        categoryAffinity: {},
        brandPreferences: {},
        priceRange: { min: 0, max: 1000, avg: 200 },
        interactions: [],
        lastUpdated: Date.now()
    });

    // Load data from localStorage on mount
    useEffect(() => {
        const savedSearches = localStorage.getItem('voltplay_searches');
        const savedBestSellers = localStorage.getItem('voltplay_bestsellers');
        const savedProfile = localStorage.getItem('voltplay_user_profile');
        const savedViews = localStorage.getItem('voltplay_views');
        const savedPurchases = localStorage.getItem('voltplay_purchases');
        const savedAnalytics = localStorage.getItem('voltplay_analytics');

        if (savedSearches) setSearchHistory(JSON.parse(savedSearches));
        if (savedBestSellers) setBestSellers(JSON.parse(savedBestSellers));
        if (savedProfile) setUserProfile(JSON.parse(savedProfile));
        if (savedViews) setViewHistory(JSON.parse(savedViews));
        if (savedPurchases) setPurchaseHistory(JSON.parse(savedPurchases));
        if (savedAnalytics) setAnalytics(JSON.parse(savedAnalytics));
    }, []);

    // Track search query
    const trackSearch = (query) => {
        if (!query || query.trim().length === 0) return;

        const normalizedQuery = query.toLowerCase().trim();
        const timestamp = Date.now();

        const newSearch = { query: normalizedQuery, timestamp };
        const updatedHistory = [newSearch, ...searchHistory].slice(0, 20);

        setSearchHistory(updatedHistory);
        localStorage.setItem('voltplay_searches', JSON.stringify(updatedHistory));
    };

    // Track product interaction and build user profile
    const trackInteraction = (productId, type = 'view', productData = null) => {
        const weight = type === 'cart' ? 3 : type === 'wishlist' ? 2 : 1;

        // Update best sellers
        const updatedBestSellers = {
            ...bestSellers,
            [productId]: (bestSellers[productId] || 0) + weight
        };
        setBestSellers(updatedBestSellers);
        localStorage.setItem('voltplay_bestsellers', JSON.stringify(updatedBestSellers));

        // Update user profile if product data provided
        if (productData) {
            const updatedProfile = { ...userProfile };

            // Update category affinity
            const category = productData.category;
            updatedProfile.categoryAffinity[category] =
                (updatedProfile.categoryAffinity[category] || 0) + weight;

            // Update brand preferences
            const brand = productData.brand;
            updatedProfile.brandPreferences[brand] =
                (updatedProfile.brandPreferences[brand] || 0) + weight;

            // Track interaction
            updatedProfile.interactions.push({
                productId,
                type,
                category,
                brand,
                price: productData.price,
                timestamp: Date.now()
            });

            // Keep only last 50 interactions
            updatedProfile.interactions = updatedProfile.interactions.slice(-50);

            // Update price range
            const prices = updatedProfile.interactions.map(i => i.price).filter(p => p);
            if (prices.length > 0) {
                updatedProfile.priceRange = {
                    min: Math.min(...prices),
                    max: Math.max(...prices),
                    avg: prices.reduce((a, b) => a + b, 0) / prices.length
                };
            }

            updatedProfile.lastUpdated = Date.now();

            setUserProfile(updatedProfile);
            localStorage.setItem('voltplay_user_profile', JSON.stringify(updatedProfile));
        }
    };

    // Apply time-based decay (exponential decay)
    const applyTimeDecay = (score, timestamp) => {
        const daysOld = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
        const decayFactor = Math.exp(-0.1 * daysOld);
        return score * decayFactor;
    };

    // Calculate product score based on user profile
    const scoreByProfile = (product) => {
        let score = 0;

        // Category affinity (weight: 30%)
        const categoryScore = userProfile.categoryAffinity[product.category] || 0;
        score += categoryScore * 0.3;

        // Brand preference (weight: 20%)
        const brandScore = userProfile.brandPreferences[product.brand] || 0;
        score += brandScore * 0.2;

        // Price range fit (weight: 15%)
        const { min, max } = userProfile.priceRange;
        if (product.price >= min && product.price <= max) {
            score += 15;
        }

        // Search relevance (weight: 20%)
        if (searchHistory.length > 0) {
            const recentSearches = searchHistory.slice(0, 5).map(s => s.query);
            const searchableText = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
            const matches = recentSearches.filter(query => searchableText.includes(query)).length;
            score += matches * 4;
        }

        // Popularity score (weight: 10%)
        const popularityScore = bestSellers[product._id] || 0;
        score += popularityScore * 0.1;

        return score;
    };

    // Calculate similarity between two products
    const calculateSimilarity = (productA, productB) => {
        let score = 0;

        // Same category (+40 points)
        if (productA.category === productB.category) score += 40;

        // Same brand (+20 points)
        if (productA.brand === productB.brand) score += 20;

        // Similar price (+20 points if within $50, +10 if within $100)
        const priceDiff = Math.abs(productA.price - productB.price);
        if (priceDiff < 50) score += 20;
        else if (priceDiff < 100) score += 10;

        // Spec overlap (if both have specs)
        if (productA.specs && productB.specs) {
            const keysA = Object.keys(productA.specs);
            const keysB = Object.keys(productB.specs);
            const commonKeys = keysA.filter(k => keysB.includes(k));
            const matchingSpecs = commonKeys.filter(k =>
                productA.specs[k] === productB.specs[k]
            ).length;
            score += matchingSpecs * 5;
        }

        return score;
    };

    // Get similar products
    const getSimilarProducts = (product, allProducts, limit = 6) => {
        if (!product || !allProducts) return [];

        const scoredProducts = allProducts
            .filter(p => p._id !== product._id) // Exclude current product
            .map(p => ({
                product: p,
                score: calculateSimilarity(product, p)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.product);

        return scoredProducts;
    };

    // Get recommendations based on search history
    const getSearchBasedRecommendations = (allProducts, limit = 6) => {
        if (searchHistory.length === 0) return [];

        const recentSearches = searchHistory.slice(0, 5).map(s => s.query);
        const matches = allProducts.filter(product => {
            const searchableText = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
            return recentSearches.some(query => searchableText.includes(query));
        });

        return matches.slice(0, limit);
    };

    // Get best seller products
    const getBestSellerIds = (limit = 10) => {
        return Object.entries(bestSellers)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit)
            .map(([productId]) => productId);
    };

    const getBestSellerProducts = (allProducts, limit = 6) => {
        const topIds = getBestSellerIds(limit * 2);
        return topIds
            .map(id => allProducts.find(p => p._id === id))
            .filter(p => p !== undefined)
            .slice(0, limit);
    };

    // Get personalized recommendations (using profile scoring)
    const getPersonalizedRecommendations = (allProducts, limit = 8) => {
        if (userProfile.interactions.length < 3) {
            // Not enough data, fall back to combined approach
            return getRecommendations(allProducts, limit);
        }

        const scoredProducts = allProducts
            .map(product => ({
                product,
                score: scoreByProfile(product)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.product);

        return scoredProducts;
    };

    // Get combined recommendations
    const getRecommendations = (allProducts, limit = 8) => {
        // Use personalized if enough profile data
        if (userProfile.interactions.length >= 3) {
            return getPersonalizedRecommendations(allProducts, limit);
        }

        // Otherwise combine search and best sellers
        const searchBased = getSearchBasedRecommendations(allProducts, Math.ceil(limit / 2));
        const bestSellersProducts = getBestSellerProducts(allProducts, Math.ceil(limit / 2));

        const combined = [...searchBased];
        bestSellersProducts.forEach(product => {
            if (!combined.find(p => p._id === product._id)) {
                combined.push(product);
            }
        });

        return combined.slice(0, limit);
    };

    // Get trending products (fallback)
    const getTrendingProducts = (allProducts, limit = 8) => {
        return allProducts
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
    };

    // Get category-specific recommendations
    const getCategoryRecommendations = (category, allProducts, limit = 6) => {
        return allProducts
            .filter(p => p.category === category)
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
    };

    // Clear all recommendation data
    const clearRecommendationData = () => {
        setSearchHistory([]);
        setBestSellers({});
        setViewHistory([]);
        setPurchaseHistory([]);
        setUserProfile({
            categoryAffinity: {},
            brandPreferences: {},
            priceRange: { min: 0, max: 1000, avg: 200 },
            interactions: [],
            lastUpdated: Date.now()
        });
        localStorage.removeItem('voltplay_searches');
        localStorage.removeItem('voltplay_bestsellers');
        localStorage.removeItem('voltplay_user_profile');
        localStorage.removeItem('voltplay_views');
        localStorage.removeItem('voltplay_purchases');
    };

    // NEW: Track product view with time spent
    const trackProductView = (productId, productData = null, timeSpent = 0) => {
        const viewData = {
            productId,
            timestamp: Date.now(),
            timeSpent, // seconds
            category: productData?.category,
            brand: productData?.brand,
            price: productData?.price
        };

        const updatedViews = [viewData, ...viewHistory].slice(0, 30); // Keep last 30 views
        setViewHistory(updatedViews);
        localStorage.setItem('voltplay_views', JSON.stringify(updatedViews));

        // Update profile if product data provided
        if (productData) {
            trackInteraction(productId, 'view', productData);
        }
    };

    // NEW: Track purchase
    const trackPurchase = (productId, productData = null) => {
        const purchaseData = {
            productId,
            timestamp: Date.now(),
            category: productData?.category,
            brand: productData?.brand,
            price: productData?.price
        };

        const updatedPurchases = [purchaseData, ...purchaseHistory].slice(0, 20); // Keep last 20
        setPurchaseHistory(updatedPurchases);
        localStorage.setItem('voltplay_purchases', JSON.stringify(updatedPurchases));

        // Heavy weight for purchases
        if (productData) {
            trackInteraction(productId, 'purchase', productData);
        }
    };

    // NEW: Get recommendations based on purchase history
    const getBasedOnPurchases = (allProducts, limit = 6) => {
        if (purchaseHistory.length === 0) return [];

        // Get categories and brands from purchases
        const purchasedCategories = {};
        const purchasedBrands = {};

        purchaseHistory.forEach(purchase => {
            if (purchase.category) {
                purchasedCategories[purchase.category] =
                    (purchasedCategories[purchase.category] || 0) + 1;
            }
            if (purchase.brand) {
                purchasedBrands[purchase.brand] =
                    (purchasedBrands[purchase.brand] || 0) + 1;
            }
        });

        // Score products based on purchased patterns
        const scoredProducts = allProducts
            .filter(p => !purchaseHistory.find(ph => ph.productId === p._id)) // Exclude purchased
            .map(product => {
                let score = 0;

                // Same category as purchased items (+5 per match)
                if (purchasedCategories[product.category]) {
                    score += purchasedCategories[product.category] * 5;
                }

                // Same brand as purchased items (+3 per match)
                if (purchasedBrands[product.brand]) {
                    score += purchasedBrands[product.brand] * 3;
                }

                return { product, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.product);

        return scoredProducts;
    };

    // NEW: Collaborative filtering simulation
    // Simulates "Users who viewed this also viewed"
    const getCollaborativeRecommendations = (currentProduct, allProducts, limit = 6) => {
        if (!currentProduct) return [];

        // In a real system, this would query actual user behavior data
        // For now, we simulate by finding products frequently viewed together

        // Get products in same category as base matches
        const sameCategoryProducts = allProducts
            .filter(p => p._id !== currentProduct._id && p.category === currentProduct.category);

        // Add some randomness to simulate collaborative patterns
        const shuffled = sameCategoryProducts.sort(() => Math.random() - 0.5);

        // Boost products matching user preferences
        const scored = shuffled.map(product => ({
            product,
            score: scoreByProfile(product)
        }));

        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.product);
    };

    // NEW: Get "You might also like" recommendations
    // Combines collaborative filtering + user profile
    const getYouMightAlsoLike = (allProducts, limit = 6) => {
        // Get most viewed products from history
        const recentViews = viewHistory.slice(0, 10);

        if (recentViews.length === 0) {
            return getRecommendations(allProducts, limit);
        }

        // Build a composite score from recent views
        const viewedCategories = {};
        const viewedBrands = {};

        recentViews.forEach(view => {
            if (view.category) {
                viewedCategories[view.category] =
                    (viewedCategories[view.category] || 0) + (view.timeSpent || 1);
            }
            if (view.brand) {
                viewedBrands[view.brand] =
                    (viewedBrands[view.brand] || 0) + 1;
            }
        });

        // Score all products
        const scoredProducts = allProducts
            .filter(p => !recentViews.find(v => v.productId === p._id)) // Exclude recently viewed
            .map(product => {
                let score = scoreByProfile(product);

                // Boost if matches recently viewed categories
                if (viewedCategories[product.category]) {
                    score += viewedCategories[product.category] * 2;
                }

                // Boost if matches recently viewed brands
                if (viewedBrands[product.brand]) {
                    score += viewedBrands[product.brand] * 1.5;
                }

                return { product, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.product);

        return scoredProducts;
    };

    // NEW: Get recommendation reason/insight
    const getRecommendationReason = (product) => {
        const reasons = [];

        // Check purchase history
        const purchasedCategory = purchaseHistory.find(p => p.category === product.category);
        if (purchasedCategory) {
            reasons.push("Based on your previous purchases");
        }

        // Check search history
        const relatedSearch = searchHistory.find(s =>
            product.name.toLowerCase().includes(s.query) ||
            product.category.toLowerCase().includes(s.query) ||
            product.brand.toLowerCase().includes(s.query)
        );
        if (relatedSearch) {
            reasons.push(`Matches your search for "${relatedSearch.query}"`);
        }

        // Check category affinity
        if (userProfile.categoryAffinity[product.category] > 5) {
            reasons.push(`Popular in ${product.category}`);
        }

        // Check brand preference
        if (userProfile.brandPreferences[product.brand] > 5) {
            reasons.push(`From ${product.brand} - your favorite brand`);
        }

        // Check best seller
        if (bestSellers[product._id] > 10) {
            reasons.push("Trending now");
        }

        return reasons.length > 0 ? reasons[0] : "Recommended for you";
    };

    // NEW: Track recommendation impression (when shown)
    const trackRecommendationImpression = (productId, sectionName = 'general') => {
        const updatedAnalytics = { ...analytics };

        // Track product impressions
        updatedAnalytics.recommendationImpressions[productId] =
            (updatedAnalytics.recommendationImpressions[productId] || 0) + 1;

        // Track section performance
        if (!updatedAnalytics.sectionPerformance[sectionName]) {
            updatedAnalytics.sectionPerformance[sectionName] = { impressions: 0, clicks: 0 };
        }
        updatedAnalytics.sectionPerformance[sectionName].impressions += 1;

        updatedAnalytics.lastUpdated = Date.now();

        setAnalytics(updatedAnalytics);
        localStorage.setItem('voltplay_analytics', JSON.stringify(updatedAnalytics));
    };

    // NEW: Track recommendation click
    const trackRecommendationClick = (productId, sectionName = 'general') => {
        const updatedAnalytics = { ...analytics };

        // Track product clicks
        updatedAnalytics.recommendationClicks[productId] =
            (updatedAnalytics.recommendationClicks[productId] || 0) + 1;

        // Track section performance
        if (!updatedAnalytics.sectionPerformance[sectionName]) {
            updatedAnalytics.sectionPerformance[sectionName] = { impressions: 0, clicks: 0 };
        }
        updatedAnalytics.sectionPerformance[sectionName].clicks += 1;

        updatedAnalytics.lastUpdated = Date.now();

        setAnalytics(updatedAnalytics);
        localStorage.setItem('voltplay_analytics', JSON.stringify(updatedAnalytics));
    };

    // NEW: Get analytics for admin dashboard
    const getAnalytics = () => {
        // Calculate click-through rates
        const totalImpressions = Object.values(analytics.recommendationImpressions).reduce((a, b) => a + b, 0);
        const totalClicks = Object.values(analytics.recommendationClicks).reduce((a, b) => a + b, 0);
        const overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : 0;

        // Get top recommended products
        const topRecommended = Object.entries(analytics.recommendationImpressions)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([productId, impressions]) => ({
                productId,
                impressions,
                clicks: analytics.recommendationClicks[productId] || 0,
                ctr: ((analytics.recommendationClicks[productId] || 0) / impressions * 100).toFixed(2)
            }));

        // Section performance with CTR
        const sectionStats = Object.entries(analytics.sectionPerformance).map(([section, data]) => ({
            section,
            ...data,
            ctr: data.impressions > 0 ? (data.clicks / data.impressions * 100).toFixed(2) : 0
        }));

        return {
            totalImpressions,
            totalClicks,
            overallCTR,
            topRecommended,
            sectionStats,
            userBehavior: {
                totalSearches: searchHistory.length,
                totalViews: viewHistory.length,
                totalPurchases: purchaseHistory.length,
                avgViewTime: viewHistory.length > 0
                    ? (viewHistory.reduce((sum, v) => sum + (v.timeSpent || 0), 0) / viewHistory.length).toFixed(1)
                    : 0
            }
        };
    };


    const value = {
        searchHistory,
        bestSellers,
        userProfile,
        viewHistory,
        purchaseHistory,
        analytics,
        trackSearch,
        trackInteraction,
        trackProductView,
        trackPurchase,
        trackRecommendationImpression,
        trackRecommendationClick,
        getRecommendations,
        getPersonalizedRecommendations,
        getBestSellerProducts,
        getSearchBasedRecommendations,
        getSimilarProducts,
        getTrendingProducts,
        getCategoryRecommendations,
        getBasedOnPurchases,
        getYouMightAlsoLike,
        getCollaborativeRecommendations,
        getRecommendationReason,
        getAnalytics,
        scoreByProfile,
        calculateSimilarity,
        applyTimeDecay,
        clearRecommendationData
    };

    return (
        <RecommendationContext.Provider value={value}>
            {children}
        </RecommendationContext.Provider>
    );
};
