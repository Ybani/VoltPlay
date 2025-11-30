import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import { User, Lock, Bell, Globe } from 'lucide-react';

function AdminSettings() {
    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0f0f16] p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Settings</h1>
                    <p className="text-gray-400">Manage your admin account and preferences</p>
                </div>

                {/* Settings Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">

                    {/* Account Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1a1a24] rounded-lg border border-blue-500/30 p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-6 h-6 text-blue-400" />
                            <h2 className="text-xl font-bold text-white">Account Settings</h2>
                        </div>
                        <div className="space-y-3 text-gray-400">
                            <p>• Update profile information</p>
                            <p>• Change email address</p>
                            <p>• Manage account details</p>
                        </div>
                    </motion.div>

                    {/* Security Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#1a1a24] rounded-lg border border-blue-500/30 p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-blue-400" />
                            <h2 className="text-xl font-bold text-white">Security</h2>
                        </div>
                        <div className="space-y-3 text-gray-400">
                            <p>• Change password</p>
                            <p>• Two-factor authentication</p>
                            <p>• Session management</p>
                        </div>
                    </motion.div>

                    {/* Notifications */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1a1a24] rounded-lg border border-blue-500/30 p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-6 h-6 text-blue-400" />
                            <h2 className="text-xl font-bold text-white">Notifications</h2>
                        </div>
                        <div className="space-y-3 text-gray-400">
                            <p>• Email notifications</p>
                            <p>• Order alerts</p>
                            <p>• Product updates</p>
                        </div>
                    </motion.div>

                    {/* System Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#1a1a24] rounded-lg border border-blue-500/30 p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-blue-400" />
                            <h2 className="text-xl font-bold text-white">System Preferences</h2>
                        </div>
                        <div className="space-y-3 text-gray-400">
                            <p>• Language preferences</p>
                            <p>• Timezone settings</p>
                            <p>• Display options</p>
                        </div>
                    </motion.div>

                </div>

                {/* Coming Soon Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg max-w-5xl"
                >
                    <p className="text-blue-300 text-center">
                        🚧 Full settings functionality coming soon. Currently displaying placeholder content.
                    </p>
                </motion.div>
            </div>
        </MainLayout>
    );
}

export default AdminSettings;
