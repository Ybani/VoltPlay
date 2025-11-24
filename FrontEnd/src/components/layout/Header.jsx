import { Search, ShoppingCart, User, ChevronDown, LogOut, Trash2 } from 'lucide-react';
import { IconButton, Badge, Button, TextField, InputAdornment, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:6969/api/users/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setRemovingId(productId);
    try {
      await axios.delete(`http://localhost:6969/api/users/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
      setCartAnimate(true);
      setTimeout(() => setCartAnimate(false), 300);
    } catch (err) {
      console.error('Failed to remove item', err);
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchCart();
      setCartAnimate(true);
      setTimeout(() => setCartAnimate(false), 300);
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('token');
    }
  }, []);

  useEffect(() => {
    const handleCartUpdated = () => {
      fetchCart();
      setCartAnimate(true);
      setTimeout(() => setCartAnimate(false), 300);
    };
    window.addEventListener('cartUpdated', handleCartUpdated);
    return () => window.removeEventListener('cartUpdated', handleCartUpdated);
  }, []);

  // Listen for auth changes (login/logout) to update user + cart without refresh
  useEffect(() => {
    const handleAuthChanged = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
          fetchCart();
          setCartAnimate(true);
          setTimeout(() => setCartAnimate(false), 300);
        } catch (err) {
          console.error('Invalid token', err);
          localStorage.removeItem('token');
          setUser(null);
          setCartItems([]);
          setIsCartOpen(false);
        }
      } else {
        setUser(null);
        setCartItems([]);
        setIsCartOpen(false);
      }
    };
    window.addEventListener('authChanged', handleAuthChanged);
    return () => window.removeEventListener('authChanged', handleAuthChanged);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !user && cartItems.length) {
      setCartItems([]);
      setIsCartOpen(false);
    }
  }, [user, cartItems.length]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartItems([]);
    setIsCartOpen(false);
    window.dispatchEvent(new Event('authChanged'));
    navigate('/');
  };

  const handleProfile = () => {
    if (!user) return;
    if (user.isAdmin) navigate('/admin/dashboard');
    else navigate('/client/profile');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f16]/50 backdrop-blur-lg border-b border-blue-500/30 will-change-transform"
    >
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center ml-20"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')} role="button" aria-label="Go to home"
        >
          <h1 className="text-3xl tracking-wider cursor-pointer font-display">
            <span className="bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent">VOLT</span>
            <span className="text-white">PLAY</span>
          </h1>
        </motion.div>

        <div className="flex-1 max-w-2xl mx-8">
          <TextField
            fullWidth
            placeholder="Search for gaming gear..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="w-5 h-5 text-purple-light" />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'var(--color-bg-800)',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-electric-purple)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-neon-blue)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-magenta)', borderWidth: '2px' },
                '& input': { color: 'white' },
                '& input::placeholder': { color: '#9ca3af', opacity: 1 },
              },
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={cartAnimate ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton className="hover:bg-electric-purple/20" onClick={() => setIsCartOpen(!isCartOpen)}>
                <Badge
                  badgeContent={cartItems.length}
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(to right, var(--color-neon-blue), var(--color-electric-purple))',
                      color: 'white'
                    }
                  }}
                >
                  <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-neon-blue transition-colors" />
                </Badge>
              </IconButton>
            </motion.div>
            <AnimatePresence>
              {isCartOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCartOpen(false)} />
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-[#1b1b25]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#3b3b4f] overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-[#3b3b4f] text-white font-semibold">Your Cart</div>
                    <div className="p-2 max-h-64 overflow-y-auto flex flex-col gap-2">
                      {cartItems.length > 0 ? cartItems.map(item => (
                        <div key={item.productId?._id || item.productId} className="flex items-center gap-3 bg-[#2a2a3b] rounded-xl px-4 py-2">
                          <div className="flex flex-col flex-1">
                            <span className="text-sm">{item.productId?.name}</span>
                            <span className="text-xs text-gray-400">Qty: {item.quantity} • ${((item.productId?.price || 0) * item.quantity).toFixed(2)}</span>
                          </div>
                          <IconButton
                            size="small"
                            aria-label="Remove from cart"
                            onClick={() => handleRemoveFromCart(item.productId?._id || item.productId)}
                            disabled={removingId === (item.productId?._id || item.productId)}
                            className="hover:bg-red-600/20"
                          >
                            <Trash2 className={`w-4 h-4 ${removingId === (item.productId?._id || item.productId) ? 'text-red-300 animate-pulse' : 'text-red-500'}`} />
                          </IconButton>
                        </div>
                      )) : (
                        <div className="text-gray-400 p-2">Your cart is empty.</div>
                      )}
                    </div>
                    <div className="p-2 flex gap-2">
                      <Button
                        onClick={() => navigate('/cart')}
                        variant="contained"
                        sx={{ flex: 1, background: 'linear-gradient(to right, var(--color-neon-blue), var(--color-electric-purple))' }}
                      >
                        View Cart
                      </Button>
                      <Button
                        onClick={() => navigate('/checkout')}
                        variant="contained"
                        sx={{ flex: 1, background: 'linear-gradient(to right, var(--color-purple-light), var(--color-magenta))' }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Avatar className="w-10 h-10 border-2 border-white/30 shadow-lg">
                  {user.firstName && user.lastName ? (
                    <span className="bg-linear-to-br from-neon-blue to-electric-purple text-white flex items-center justify-center w-full h-full rounded-full">
                      {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                    </span>
                  ) : null}
                </Avatar>
                <span className="hidden md:block text-white font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-4 h-4 text-white" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      className="absolute right-0 mt-2 w-64 bg-[#1b1b25]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#3b3b4f] overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-[#3b3b4f]">
                        <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-400">{user.isAdmin ? 'Admin Account' : 'Client Account'}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-2">
                        <motion.button
                          onClick={handleProfile}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2a2a3b] transition-colors text-white font-medium"
                          whileHover={{ x: 4 }}
                        >
                          <User className="w-5 h-5 text-gray-300" />
                          <span>Profile</span>
                        </motion.button>
                        <motion.button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600/20 transition-colors text-red-500 font-medium"
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                startIcon={<User className="w-5 h-5" />}
                sx={{
                  background: 'linear-gradient(to right, var(--color-neon-blue), var(--color-electric-purple))',
                  '&:hover': {
                    background: 'linear-gradient(to right, var(--color-purple-light), var(--color-magenta))',
                  },
                  textTransform: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                Login
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

