import React from "react";
import {Header} from "./sections/Header";
import {HeroCarousel} from "./sections/Hero";
import { Sidebar } from "./SideBar.jsx";
import { useState } from "react";
import { ProductCategories } from "./sections/ProductCategories.jsx";
import { Footer } from "./sections/Footer.jsx";


export function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Header />
      <Sidebar
        isExpanded={sidebarExpanded}
        onExpandChange={setSidebarExpanded}
      />
      <main className={`transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
        <HeroCarousel />
        <ProductCategories />
      </main>
      <Footer sidebarExpanded={sidebarExpanded} />
    </div>
  );
}