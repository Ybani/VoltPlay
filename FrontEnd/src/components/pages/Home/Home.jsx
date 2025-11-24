import React from "react";
// import {Header} from "./sections/Header";
import {HeroCarousel} from "./sections/Hero.jsx";
// import { Sidebar } from "./SideBar.jsx";
import { useState } from "react";
import { ProductCategories } from "./sections/ProductCategories.jsx";
// import { Footer } from "./sections/Footer.jsx";

export function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroCarousel />
        <ProductCategories />
      </main>
    </div>
  );
}

