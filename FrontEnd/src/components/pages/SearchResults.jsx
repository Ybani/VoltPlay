import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../common/ProductCard';
import MainLayout from '../layout/MainLayout';
import { Search, ArrowLeft } from 'lucide-react';
import { useRecommendations } from '../../context/RecommendationContext';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { trackSearch } = useRecommendations();

    useEffect(() => {
        if (query) {
            trackSearch(query); // Track the search query
            fetchSearchResults();
        }
    }, [query]);

    const fetchSearchResults = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:6969/api/products`);

            // Filter products based on search query
            const filtered = response.data.data.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.brand.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );

            setProducts(filtered);
            setError(null);
        } catch (err) {
            console.error('Error fetching search results:', err);
            setError('Failed to load search results. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                        >
                            <ArrowLeft size={20} />
                            Back to Home
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            <Search size={32} className="text-neon-blue" />
                            <h1 className="text-5xl font-bold">
                                <span className="bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent">
                                    Search Results
                                </span>
                            </h1>
                        </div>

                        <p className="text-gray-400 text-lg">
                            {loading ? (
                                'Searching...'
                            ) : (
                                <>
                                    {products.length} {products.length === 1 ? 'result' : 'results'} for "{query}"
                                </>
                            )}
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neon-blue"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center text-red-400 py-12">
                            <p>{error}</p>
                            <button
                                onClick={fetchSearchResults}
                                className="mt-4 px-6 py-2 bg-neon-blue text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && !error && products.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <Search size={80} className="mx-auto mb-6 text-gray-600" />
                            <h2 className="text-2xl font-bold text-white mb-4">No results found</h2>
                            <p className="text-gray-400 mb-8">
                                We couldn't find any products matching "{query}". Try a different search term.
                            </p>
                            <Link
                                to="/"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all"
                            >
                                Browse All Products
                            </Link>
                        </motion.div>
                    )}

                    {/* Products Grid */}
                    {!loading && !error && products.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default SearchResults;
