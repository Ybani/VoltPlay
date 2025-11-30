import React from "react";
import { useState, useEffect } from "react";
import { Sidebar } from "./SideBar";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

const MainLayout = ({ children }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is admin from localStorage
        const adminStatus = localStorage.getItem('voltplay_isAdmin');
        setIsAdmin(adminStatus === 'true');
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-[#0f0f16]">

            {/* Sidebar - Fixed (Admin or Regular) */}
            {isAdmin ? (
                <AdminSidebar
                    isExpanded={sidebarExpanded}
                    onExpandChange={setSidebarExpanded}
                />
            ) : (
                <Sidebar
                    isExpanded={sidebarExpanded}
                    onExpandChange={setSidebarExpanded}
                />
            )}

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">

                {/* Header - Fixed */}
                <Header />

                {/* Scrollable Page content (only this area scrolls) */}
                <main className={`flex-1 overflow-y-auto transition-all duration-300 pt-20 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                    {children}

                    {/* Footer inside scrollable area */}
                    <Footer sidebarExpanded={sidebarExpanded} />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
