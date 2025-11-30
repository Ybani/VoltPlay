import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ProductManager = () => {
    const { token, user, isAdmin, isAuthenticated } = useAuth();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        stock: '',
        imageUrl: ''
    });

    // Debug auth state on component mount
    useEffect(() => {
        console.log('=== ProductManager Auth Debug ===');
        console.log('Is Authenticated:', isAuthenticated);
        console.log('Is Admin:', isAdmin);
        console.log('Token exists:', !!token);
        console.log('User:', user);
        console.log('================================');
    }, [token, user, isAdmin, isAuthenticated]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, categoryFilter, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:6969/api/products');
            setProducts(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    const handleOpenDialog = (product = null) => {
        if (product) {
            setEditMode(true);
            setCurrentProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                brand: product.brand,
                stock: product.stock,
                imageUrl: product.imageUrl
            });
        } else {
            setEditMode(false);
            setCurrentProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                brand: '',
                stock: '',
                imageUrl: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditMode(false);
        setCurrentProduct(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        // Check authentication
        if (!token) {
            alert(`❌ Authentication Error\n\nYou must be logged in as admin.\n\nCurrent status:\n- Authenticated: ${isAuthenticated}\n- Admin: ${isAdmin}\n- Token: ${token ? 'EXISTS' : 'MISSING'}\n\nPlease log in with admin credentials.`);
            return;
        }

        if (!isAdmin) {
            alert('❌ Permission Denied\n\nThis action requires admin privileges.\n\nPlease log in with an admin account.');
            return;
        }

        console.log('Submitting with token:', token ? 'Token exists' : 'NO TOKEN');
        console.log('User is admin:', isAdmin);

        try {
            if (editMode) {
                const response = await axios.put(
                    `http://localhost:6969/api/products/${currentProduct._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Update response:', response.data);
                alert('✅ Product updated successfully!');
            } else {
                const response = await axios.post(
                    'http://localhost:6969/api/products',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Create response:', response.data);
                alert('✅ Product created successfully!');
            }
            fetchProducts();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving product:', error);
            console.error('Error response:', error.response?.data);

            if (error.response?.status === 401) {
                alert(`❌ Authentication Failed (401)\n\n${error.response?.data?.message || 'Your session may have expired.'}\n\nPlease log out and log in again as admin.`);
            } else if (error.response?.status === 403) {
                alert(`❌ Permission Denied (403)\n\n${error.response?.data?.message || 'Admin access required.'}\n\nPlease log in with admin credentials.`);
            } else {
                alert(`Error saving product: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    const handleDelete = async (productId) => {
        if (!token) {
            alert('You must be logged in as admin to delete products.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(
                    `http://localhost:6969/api/products/${productId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                alert('Product deleted successfully!');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);

                if (error.response?.status === 401) {
                    alert('Authentication failed. Please log in as admin first.');
                } else if (error.response?.status === 403) {
                    alert('Access denied. You need admin privileges.');
                } else {
                    alert(`Error deleting product: ${error.response?.data?.message || error.message}`);
                }
            }
        }
    };

    const categories = ['keyboards', 'mice', 'monitors', 'consoles', 'audio'];

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0f0f16] p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Product Manager</h1>
                    <p className="text-gray-400">Manage your product inventory</p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* Search */}
                    <TextField
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            flex: 1,
                            minWidth: '300px',
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                            }
                        }}
                        InputProps={{
                            startAdornment: <Search className="w-5 h-5 text-gray-400 mr-2" />
                        }}
                    />

                    {/* Category Filter */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel sx={{ color: 'gray' }}>Category</InputLabel>
                        <Select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            label="Category"
                            sx={{
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                            }}
                        >
                            <MenuItem value="all">All Categories</MenuItem>
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Add Product Button */}
                    <Button
                        variant="contained"
                        startIcon={<Plus />}
                        onClick={() => handleOpenDialog()}
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                            }
                        }}
                    >
                        Add Product
                    </Button>
                </div>

                {/* Products Table */}
                <div className="bg-[#1a1a24] rounded-lg border border-blue-500/30 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-900/20 border-b border-blue-500/30">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Brand</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredProducts.map((product, index) => (
                                        <motion.tr
                                            key={product._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-blue-500/10 hover:bg-blue-900/10 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                                            <td className="px-6 py-4 text-gray-400 capitalize">{product.category}</td>
                                            <td className="px-6 py-4 text-gray-400">{product.brand}</td>
                                            <td className="px-6 py-4 text-green-400 font-semibold">${product.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 10 ? 'bg-green-500/20 text-green-400' :
                                                    product.stock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {product.stock} units
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleOpenDialog(product)}
                                                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            No products found
                        </div>
                    )}
                </div>

                {/* Product Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            backgroundColor: '#1a1a24',
                            color: 'white',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                        }
                    }}
                >
                    <DialogTitle sx={{ borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        {editMode ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <TextField
                                name="name"
                                label="Product Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }
                                }}
                            />
                            <TextField
                                name="brand"
                                label="Brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }
                                }}
                            />
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'gray' }}>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    label="Category"
                                    sx={{
                                        color: 'white',
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }}
                                >
                                    {categories.map(cat => (
                                        <MenuItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                name="price"
                                label="Price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }
                                }}
                            />
                            <TextField
                                name="stock"
                                label="Stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }
                                }}
                            />
                            <TextField
                                name="imageUrl"
                                label="Image URL"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{
                                    gridColumn: 'span 2',
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }
                                }}
                            />
                            <TextField
                                name="description"
                                label="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{
                                    gridColumn: 'span 2',
                                    '& .MuiInputLabel-root': { color: 'gray' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    }
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ borderTop: '1px solid rgba(59, 130, 246, 0.2)', p: 2 }}>
                        <Button onClick={handleCloseDialog} sx={{ color: 'gray' }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                                }
                            }}
                        >
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </MainLayout>
    );
};

export default ProductManager;
