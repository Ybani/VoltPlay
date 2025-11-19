import { Home, Gamepad2, Keyboard, Mouse, Monitor, Headphones } from 'lucide-react';
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar({ isExpanded, onExpandChange }) {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Keyboard, label: 'Keyboards' },
    { icon: Mouse, label: 'Mice' },
    { icon: Monitor, label: 'PCs & Monitors' },
    { icon: Gamepad2, label: 'Consoles' },
    { icon: Headphones, label: 'Audio' },
  ];

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 top-0 bottom-0 z-40 bg-bg-800 transition-all duration-300 pt-20 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => onExpandChange(true)}
      onMouseLeave={() => onExpandChange(false)}
    >
      <nav className="flex flex-col gap-2 p-3">
        {menuItems.map((item, index) => (
          <Tooltip 
            key={index} 
            title={!isExpanded ? item.label : ''} 
            placement="right"
            arrow
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-neon-blue/20 text-neon-blue shadow-[0_0_8px_var(--color-neon-blue)] border border-neon-blue/50'
                  : 'text-gray-400 hover:text-neon-blue hover:bg-bg-700 hover:shadow-[0_0_6px_var(--color-neon-blue)]'
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
        ))}
      </nav>

      {/* Decorative gradient line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 opacity-70"
        style={{
          background: 'linear-gradient(90deg, var(--color-neon-blue), var(--color-electric-purple), var(--color-magenta))',
          backgroundSize: '200% 200%',
        }}
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: 'linear' 
        }}
      />
    </motion.aside>
  );
}
