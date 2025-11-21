import React from "react";
import { useState } from "react";
import { Sidebar } from "./SideBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

const MainLayout = ({ children }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    return (
        <div className="flex min-h-screen bg-[#0f0f16]">

            {/* Sidebar */}
            <Sidebar
                isExpanded={sidebarExpanded}
                onExpandChange={setSidebarExpanded}
            />

            {/* Main Content */}
            <div className="flex flex-col flex-1">

                {/* Header */}
                <Header />

                {/* Page content (changes depending on the route) */}
                <main className={`transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                    {children}
                </main>

                {/* Footer */}
                <Footer sidebarExpanded={sidebarExpanded} />
            </div>
        </div>
    );
};

export default MainLayout;
