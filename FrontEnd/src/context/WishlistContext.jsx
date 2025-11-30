import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { isAuthenticated } = useAuth();

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('voltplay_wishlist');
        if (savedWishlist) {
            try {
                setWishlistItems(JSON.parse(savedWishlist));
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('voltplay_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Add item to wishlist
    const addToWishlist = (product) => {
        if (!isAuthenticated) {
            alert('Please sign in to add items to your wishlist');
            return;
        }

        setWishlistItems(prevItems => {
            const exists = prevItems.find(item => item._id === product._id);
            if (!exists) {
                return [...prevItems, product];
            }
            return prevItems;
        });
    };

    // Remove item from wishlist
    const removeFromWishlist = (productId) => {
        setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    // Toggle item in wishlist
    const toggleWishlist = (product) => {
        const exists = wishlistItems.find(item => item._id === product._id);
        if (exists) {
            removeFromWishlist(product._id);
        } else {
            // Only check authentication when adding
            if (!isAuthenticated) {
                alert('Please sign in to add items to your wishlist');
                return;
            }
            addToWishlist(product);
        }
    };

    // Check if item is in wishlist
    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item._id === productId);
    };

    // Get wishlist count
    const getWishlistCount = () => {
        return wishlistItems.length;
    };

    // Clear entire wishlist
    const clearWishlist = () => {
        setWishlistItems([]);
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
        clearWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
