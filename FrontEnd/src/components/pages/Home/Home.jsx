import React from "react";
// import {Header} from "./sections/Header";
import { HeroCarousel } from "./sections/Hero.jsx";
// import { Sidebar } from "./SideBar.jsx";
import { useState } from "react";
import { ProductCategories } from "./sections/ProductCategories.jsx";
// import { Footer } from "./sections/Footer.jsx";
import MainLayout from "../../layout/MainLayout.jsx";
import RecommendedProducts from "../../common/RecommendedProducts.jsx";
import YouMightAlsoLike from "../../common/YouMightAlsoLike.jsx";
import BasedOnPurchases from "../../common/BasedOnPurchases.jsx";
import { useRecommendations } from "../../../context/RecommendationContext.jsx";

export function Home() {
  const { getRecommendations, getTrendingProducts } = useRecommendations();

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

          {/* AI Recommendation Sections */}
          <div className="max-w-7xl mx-auto px-6">
            {/* Recommended for You */}
            <RecommendedProducts
              title="Recommended for You"
              limit={8}
              getProductsFunction={getRecommendations}
            />

            {/* You Might Also Like - AI based */}
            <YouMightAlsoLike limit={6} />

            {/* Based on Your Purchases - AI based */}
            <BasedOnPurchases limit={6} />
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

