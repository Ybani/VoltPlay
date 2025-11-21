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

