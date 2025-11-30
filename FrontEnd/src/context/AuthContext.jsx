import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load user data from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('voltplay_user');
        const savedToken = localStorage.getItem('voltplay_token');
        const savedIsAdmin = localStorage.getItem('voltplay_isAdmin');

        if (savedUser && savedToken) {
            try {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
                setIsAdmin(savedIsAdmin === 'true');
            } catch (error) {
                console.error('Error loading user from localStorage:', error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        setIsAdmin(userData.isAdmin || false);

        // Save to localStorage
        localStorage.setItem('voltplay_user', JSON.stringify(userData));
        localStorage.setItem('voltplay_token', authToken);
        localStorage.setItem('voltplay_isAdmin', userData.isAdmin || false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAdmin(false);

        // Clear localStorage
        localStorage.removeItem('voltplay_user');
        localStorage.removeItem('voltplay_token');
        localStorage.removeItem('voltplay_isAdmin');
    };

    const value = {
        user,
        token,
        isAdmin,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
