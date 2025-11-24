import React, { useState } from 'react';
import { Sidebar } from './SideBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

const MainLayout = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const location = useLocation();
    return (
        <div className="flex min-h-screen bg-[#0f0f16]">
            <Sidebar
                isExpanded={sidebarExpanded}
                onExpandChange={setSidebarExpanded}
            />
            <div className="flex flex-col flex-1">
                <Header />
                <main className={`relative transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            style={{ willChange: 'opacity' }}
                            className="min-h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
                <Footer sidebarExpanded={sidebarExpanded} />
            </div>
        </div>
    );
};

export default MainLayout;
