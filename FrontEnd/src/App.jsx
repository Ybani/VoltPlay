import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Common pages
import { Home } from './components/pages/Home/Home.jsx';
import NotFound from './components/Error/NotFound.jsx';
import Login from './components/auth/Login.jsx';
import CreateAccount from './components/auth/CreateAccount.jsx';
// other pages
import Keyboards from './components/pages/Keyboards.jsx';
import Mice from './components/pages/Mice.jsx';
import Console from './components/pages/Console.jsx';
import Monitors from "./components/pages/Monitors.jsx";
import Audio from "./components/pages/Audio.jsx";
import SearchResults from './components/pages/SearchResults.jsx';
import Cart from './components/pages/Cart.jsx';
import Checkout from './components/pages/Checkout.jsx';
import Wishlist from './components/pages/Wishlist.jsx';
import ProductDetails from './components/pages/ProductDetails.jsx';
import AdminDashboard from './components/pages/AdminDashboard.jsx';
import ProductManager from './components/pages/ProductManager.jsx';
import AdminSettings from './components/pages/AdminSettings.jsx';
import AdminAIInsights from './components/pages/AdminAIInsights.jsx';
import UserReviews from './components/pages/UserReviews.jsx';


// AnimatedRoutes
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/keyboards"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Keyboards />
            </motion.div>
          }
        />
        <Route
          path="/mice"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Mice />
            </motion.div>
          }
        />
        <Route
          path="/audio"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Audio />
            </motion.div>
          }
        />
        <Route
          path="/consoles"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Console />
            </motion.div>
          }
        />
        <Route
          path="/pcs-monitors"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Monitors />
            </motion.div>
          }
        />
        <Route
          path="/search"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <SearchResults />
            </motion.div>
          }
        />
        <Route
          path="/cart"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Cart />
            </motion.div>
          }
        />
        <Route
          path="/checkout"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Checkout />
            </motion.div>
          }
        />
        <Route
          path="/wishlist"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Wishlist />
            </motion.div>
          }
        />
        <Route
          path="/product/:id"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <ProductDetails />
            </motion.div>
          }
        />
        <Route
          path="/admin"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <AdminDashboard />
            </motion.div>
          }
        />
        <Route
          path="/admin/products"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductManager />
            </motion.div>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminSettings />
            </motion.div>
          }
        />
        <Route
          path="/admin/ai-insights"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminAIInsights />
            </motion.div>
          }
        />
        <Route
          path="/user/reviews"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserReviews />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/create-account"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CreateAccount />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}




function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;

