import { Home, Gamepad2, Keyboard, Mouse, Monitor, Headphones, Settings } from 'lucide-react';
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Sidebar({ isExpanded, onExpandChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Keyboard, label: 'Keyboards', path: '/keyboards' },
    { icon: Mouse, label: 'Mice', path: '/mice' },
    { icon: Headphones, label: 'Audio', path: '/audio' },
    { icon: Monitor, label: 'PCs & Monitors', path: '/pcs-monitors' },
    { icon: Gamepad2, label: 'Consoles', path: '/consoles' },
  ];

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 top-0 bottom-0 z-50 bg-[#0f0f16] border-r border-blue-500/30 transition-all duration-300 pt-20 ${isExpanded ? 'w-64' : 'w-20'
        }`}
      onMouseEnter={() => onExpandChange(true)}
      onMouseLeave={() => onExpandChange(false)}
    >
      <nav className="flex flex-col gap-2 p-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Tooltip
              key={index}
              title={!isExpanded ? item.label : ''}
              placement="right"
              arrow
            >
              <motion.button
                onClick={() => navigate(item.path)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-linear-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 border border-blue-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-blue-900/20'
                  }`}
              >
                <item.icon className="w-6 h-6 shrink-0" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Tooltip>
          );
        })}
      </nav>

      {/* Decorative gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-50"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />
    </motion.aside>
  );
}
