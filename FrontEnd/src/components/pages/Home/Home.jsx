import React from "react";
// import {Header} from "./sections/Header";
import {HeroCarousel} from "./sections/Hero.jsx";
// import { Sidebar } from "./SideBar.jsx";
import { useState } from "react";
import { ProductCategories } from "./sections/ProductCategories.jsx";
// import { Footer } from "./sections/Footer.jsx";
import MainLayout from "../../layout/MainLayout.jsx";

export function Home() {
  
  return (
    <MainLayout>
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      {/* <Header /> */}
      {/* <Sidebar
        isExpanded={sidebarExpanded}
        onExpandChange={setSidebarExpanded}
      /> */}
      <main >
        <HeroCarousel />
        <ProductCategories />
      </main>
    </div>
    </MainLayout>
  );
}

