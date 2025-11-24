import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './components/pages/Home/Home.jsx';
import NotFound from './components/Error/NotFound.jsx';
import Login from './components/auth/Login.jsx';
import CreateAccount from './components/auth/CreateAccount.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import Keyboards from './components/pages/Keyboards.jsx';
import Mice from './components/pages/Mice.jsx';
import Console from './components/pages/Console.jsx';
import Monitors from './components/pages/Monitors.jsx';
import Audio from './components/pages/Audio.jsx';
import CartPage from './components/pages/Cart.jsx';
import MainLayout from './components/layout/MainLayout.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/Keyboards" element={<Keyboards />} />
          <Route path="/Monitors" element={<Monitors />} />
          <Route path="/Mice" element={<Mice />} />
          <Route path="/Console" element={<Console />} />
          <Route path="/Audio" element={<Audio />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

