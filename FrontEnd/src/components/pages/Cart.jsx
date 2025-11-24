import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { IconButton, Button, TextField } from '@mui/material';
import { Trash2, RefreshCw, ShoppingCart } from 'lucide-react';

// Cart page lists all cart items with ability to adjust quantity and remove items.
// Expects backend endpoints:
//   GET    /api/users/cart                -> returns [{ productId: { _id, name, price, productPictures }, quantity }]
//   PUT    /api/users/cart (body: {productId, quantity})
//   DELETE /api/users/cart/:productId
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // productId currently updating
  const [removing, setRemoving] = useState(null);
  const [error, setError] = useState(null);
  // Local pending quantity state to debounce server updates
  const [pendingQty, setPendingQty] = useState({});
  const timersRef = useRef({});

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:6969/api/users/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data || [];
      setCartItems(data);
      // Sync pending quantities with server quantities (avoid flicker)
      const initial = {};
      data.forEach(ci => {
        const pid = ci.productId?._id || ci.productId;
        initial[pid] = ci.quantity;
      });
      setPendingQty(initial);
    } catch (e) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const commitQuantity = async (productId, quantity) => {
    if (!token) return;
    if (quantity < 1) return; // prevent zero
    setUpdating(productId);
    try {
      await axios.put('http://localhost:6969/api/users/cart', { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'update', productId, quantity } }));
    } catch (e) {
      setError('Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };

  // Handle immediate input changes locally and debounce commit
  const handleQuantityInputChange = (productId, nextValRaw) => {
    const nextVal = parseInt(nextValRaw, 10);
    if (isNaN(nextVal) || nextVal < 1) return; // ignore invalid
    setPendingQty(prev => ({ ...prev, [productId]: nextVal }));
    // Clear existing timer
    if (timersRef.current[productId]) {
      clearTimeout(timersRef.current[productId]);
    }
    // Debounce commit to avoid flicker when using arrows rapidly
    timersRef.current[productId] = setTimeout(() => {
      const item = cartItems.find(ci => (ci.productId?._id || ci.productId) === productId);
      if (!item) return;
      // Only commit if value actually changed
      if (item.quantity !== nextVal) {
        commitQuantity(productId, nextVal);
      }
    }, 450); // ~0.45s debounce
  };

  const handleQuantityBlur = (productId) => {
    // On blur, force commit if pending differs
    const item = cartItems.find(ci => (ci.productId?._id || ci.productId) === productId);
    if (!item) return;
    const pending = pendingQty[productId];
    if (pending && pending !== item.quantity) {
      if (timersRef.current[productId]) clearTimeout(timersRef.current[productId]);
      commitQuantity(productId, pending);
    }
  };

  const handleRemove = async (productId) => {
    if (!token) return;
    setRemoving(productId);
    try {
      await axios.delete(`http://localhost:6969/api/users/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'remove', productId } }));
    } catch (e) {
      setError('Failed to remove item');
    } finally {
      setRemoving(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  // Placeholder shipping / tax logic (could be dynamic later)
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = 0; // Add actual logic if needed
  const total = subtotal + shipping + tax;

  if (!token) {
    return (
      <div className='mt-24 mx-5'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='p-6 border border-border rounded-xl bg-bg-800 max-w-xl'>
          <h2 className='text-2xl font-semibold mb-2 gradient-heading'>Your Cart</h2>
          <p className='text-gray-400 mb-4'>You are not logged in. Please log in to view your cart.</p>
          <Button href='/login' variant='contained' sx={{ background: 'linear-gradient(to right, var(--color-neon-blue), var(--color-electric-purple))' }}>Login</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='mt-24 mx-5 grid grid-cols-1 xl:grid-cols-4 gap-8'>
      {/* Items List */}
      <div className='xl:col-span-3 flex flex-col gap-4'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='flex items-center justify-between mb-2'>
          <h2 className='text-3xl font-bold gradient-heading'>Shopping Cart</h2>
          <div className='flex gap-2'>
            <Button
              size='small'
              onClick={fetchCart}
              variant='outlined'
              startIcon={<RefreshCw className='w-4 h-4' />}
              sx={{ borderColor: 'var(--color-neon-blue)', color: 'var(--color-neon-blue)' }}
            >
              Refresh
            </Button>
          </div>
        </motion.div>

        {loading && (
          <div className='text-gray-400'>Loading cart...</div>
        )}
        {error && (
          <div className='text-red-500 text-sm'>{error}</div>
        )}
        {!loading && cartItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-6 border border-border rounded-xl bg-bg-800'>
            <div className='flex flex-col items-center gap-3'>
              <ShoppingCart className='w-10 h-10 text-gray-500' />
              <p className='text-gray-400'>Your cart is empty.</p>
              <Button href='/' variant='contained' sx={{ background: 'linear-gradient(to right, var(--color-neon-blue), var(--color-electric-purple))' }}>Continue Shopping</Button>
            </div>
          </motion.div>
        )}

        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => {
            const product = item.productId || {}; // populated product
            const productId = product._id || item.productId; // fallback
            const image = product.productPictures?.[0]?.url || '/placeholder.png';
            const price = product.price || 0;
            return (
              <motion.div
                key={productId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className='group border border-border bg-bg-800 rounded-xl p-4 flex gap-4 hover:border-neon-blue/50 transition-colors'
              >
                <div className='w-28 h-28 overflow-hidden rounded-lg bg-bg-700'>
                  <img src={image} alt={product.name} className='w-full h-full object-cover' />
                </div>
                <div className='flex-1 flex flex-col justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    <p className='text-sm text-gray-400'>Unit Price: ${price.toFixed(2)}</p>
                  </div>

                  <div className='flex items-center gap-3 mt-2'>
                    <TextField
                      type='number'
                      size='small'
                      label='Qty'
                      value={pendingQty[productId] ?? item.quantity}
                      onChange={(e) => handleQuantityInputChange(productId, e.target.value)}
                      onBlur={() => handleQuantityBlur(productId)}
                      inputProps={{ min: 1, step: 1 }}
                      sx={{
                        width: 90,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'var(--color-bg-700)',
                          color: '#fff'
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0
                        },
                        '& input': {
                          MozAppearance: 'textfield'
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-neon-blue)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-electric-purple)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-magenta)', borderWidth: '2px' }
                      }}
                    />
                    <div className='text-sm text-gray-400'>Line Total: ${(price * item.quantity).toFixed(2)}</div>
                    <IconButton
                      onClick={() => handleRemove(productId)}
                      disabled={removing === productId}
                      sx={{
                        backgroundColor: 'rgba(255,0,0,0.05)',
                        border: '1px solid rgba(255,0,0,0.2)',
                        '&:hover': { backgroundColor: 'rgba(255,0,0,0.15)' }
                      }}
                    >
                      <Trash2 className={`w-5 h-5 ${removing === productId ? 'animate-pulse text-red-300' : 'text-red-500'}`} />
                    </IconButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className='border border-border bg-bg-800 rounded-xl p-6 h-fit sticky top-28 flex flex-col gap-4'
      >
        <h2 className='text-2xl font-semibold gradient-heading'>Summary</h2>
        <div className='flex flex-col gap-2 text-sm'>
          <div className='flex justify-between'><span className='text-gray-400'>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className='flex justify-between'><span className='text-gray-400'>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className='flex justify-between'><span className='text-gray-400'>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className='flex justify-between pt-2 border-t border-border'><span className='font-semibold'>Total</span><span className='font-semibold'>${total.toFixed(2)}</span></div>
        </div>
        <Button
          fullWidth
          variant='contained'
          sx={{
            background: 'linear-gradient(to right, var(--color-neon-blue), var(--color-electric-purple))',
            '&:hover': { background: 'linear-gradient(to right, var(--color-purple-light), var(--color-magenta))' }
          }}
          onClick={() => window.location.href = '/checkout'}
        >
          Checkout
        </Button>
        <Button
          fullWidth
          variant='outlined'
          href='/'
          sx={{ borderColor: 'var(--color-neon-blue)', color: 'var(--color-neon-blue)', '&:hover': { borderColor: 'var(--color-electric-purple)', color: 'var(--color-electric-purple)' } }}
        >
          Continue Shopping
        </Button>
        {updating && <div className='text-xs text-gray-400'>Updating item...</div>}
      </motion.div>
    </div>
  );
}
