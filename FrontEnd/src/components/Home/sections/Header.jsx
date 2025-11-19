import { Search, ShoppingCart, User } from 'lucide-react';
import { IconButton, Badge, Button, TextField, InputAdornment } from '@mui/material';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';


export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-800/90 backdrop-blur-lg "
    >
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center ml-20"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-3xl tracking-wider cursor-pointer font-display">
              <span className="bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent">
                VOLT
              </span>
              <span className="text-white">PLAY</span>
            </h1>
          </motion.div>

          {/* Search Bar */}
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

                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--color-electric-purple)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--color-neon-blue)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--color-magenta)',
                    borderWidth: '2px',
                  },

                  '& input': {
                    color: 'white',
                  },
                  '& input::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
                },
              }}
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton className="hover:bg-electric-purple/20">
                <Badge 
                  badgeContent={0} 
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
            
            {/* Login Button */}
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

          </div>
        </div>
      </div>
    </motion.header>
  );
}
