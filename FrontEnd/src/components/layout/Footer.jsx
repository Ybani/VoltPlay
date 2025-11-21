import { Shield, Truck, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';
import { Chip } from '@mui/material';
import { motion } from 'motion/react';

export function Footer({ sidebarExpanded }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-[#0f0f16] border-t border-blue-500/30 py-12 transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}
    >
      <div className="px-6">
        {/* Top Section - Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-blue-500/30">
          {/* Secure Payment */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 p-6 bg-[#1a1a24] rounded-xl border border-blue-500/30"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                  '0 0 30px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg"
            >
              <Shield className="w-8 h-8 text-green-400" />
            </motion.div>
            <div>
              <h3 className="text-xl mb-2 text-white">Secure Payment</h3>
              <p className="text-gray-400 text-sm">
                Your transactions are protected with industry-standard SSL encryption. We accept all major credit cards and PayPal.
              </p>
              <div className="flex gap-2 mt-3">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <CreditCard className="w-5 h-5 text-red-400" />
                </motion.div>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Lock className="w-5 h-5 text-red-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Fast Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 p-6 bg-[#1a1a24] rounded-xl border border-blue-500/30"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 30px rgba(6, 182, 212, 0.5)',
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg"
            >
              <Truck className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <div>
              <h3 className="text-xl mb-2 text-white">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">
                Free shipping on orders over $100. Express delivery available worldwide. Track your order in real-time.
              </p>
              <div className="mt-3">
                <Chip
                  label="2-5 Business Days"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(220, 38, 38, 0.2)',
                    color: '#ef4444',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 p-6 bg-[#1a1a24] rounded-xl border border-blue-500/30"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                  '0 0 30px rgba(168, 85, 247, 0.5)',
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg"
            >
              <Mail className="w-8 h-8 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="text-xl mb-2 text-white">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span>support@voltplay.com</span>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>24/7 Customer Support</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 VoltPlay. All rights reserved.</p>
          </motion.div>
          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ color: '#ef4444', scale: 1.05 }}
              className="transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#ef4444', scale: 1.05 }}
              className="transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#ef4444', scale: 1.05 }}
              className="transition-colors"
            >
              Refund Policy
            </motion.a>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <span>Secure Shopping Guaranteed</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <motion.div
        className="mt-8 h-1"
        animate={{
          background: [
            'linear-gradient(to right, #450a0a, #dc2626, #7f1d1d)',
            'linear-gradient(to right, #7f1d1d, #450a0a, #dc2626)',
            'linear-gradient(to right, #dc2626, #7f1d1d, #450a0a)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ opacity: 0.5 }}
      />
    </motion.footer>
  );
}