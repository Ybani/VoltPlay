import React from "react";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../assets/boy.png';
import { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";




function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:6969/api/auth/login', { email, password });
      localStorage.setItem("token", res.data.token);
      const user = jwtDecode(res.data.token);
      // Notify app that auth state changed so Header can update immediately
      window.dispatchEvent(new Event('authChanged'));
      Swal.fire({
        title: `Welcome Back, ${user.firstName} ${user.lastName}!`,
        icon: 'success',
        timer: 3000,
        background: '#0a0a0f',
        color: '#fff',
        showConfirmButton: false,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      Swal.fire({
        title: "Login Error",
        text: err.response?.data?.message || err.message,
        icon: "error",
        background: '#0a0a0f',
        color: '#fff',
        timer: 3000,
        showConfirmButton: true
      });
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-[#0a0b09]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card */}
      <div className="flex w-[900px] h-[550px] bg-bg-800 rounded-4xl  overflow-hidden">

        {/* Left side - Login form */}
        <div className="flex flex-col justify-center items-center w-1/2 p-10">
          <h2 className="text-4xl font-bold bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent drop-shadow-[0_0_10px_var(--color-neon-blue)] mb-2">
            Connexion
          </h2>
          <p className="text-gray-300 text-sm mb-8 text-center">
            Welcome back! Please sign in to continue
          </p>

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            fullWidth
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "gray" },
              "& .MuiFilledInput-root": {
                backgroundColor: "#0f0f16",
                "&:hover": { backgroundColor: "#1a1a24" },
                "&.Mui-focused": { backgroundColor: "#1a1a24" },
              },
            }}
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="filled"
            fullWidth
            sx={{
              mb: 4,
              input: { color: "white" },
              label: { color: "gray" },
              "& .MuiFilledInput-root": {
                backgroundColor: "#0f0f16",
                "&:hover": { backgroundColor: "#1a1a24" },
                "&.Mui-focused": { backgroundColor: "#1a1a24" },
              },
            }}
          />

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(to right, #3b82f6, #9333ea, #ec4899)",
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              boxShadow: "0 0 12px #3b82f6",
              "&:hover": {
                background: "linear-gradient(to right, #2563eb, #7c3aed, #db2777)",
                boxShadow: "0 0 16px #3b82f6",
              },
            }}
          >
            Connect
          </Button>

          <div className="flex justify-between w-full mt-4 text-sm text-gray-400">
            <Link to="/forgot-password" className="hover:text-neon-blue hover:underline transition-colors">
              Forgot password?
            </Link>
            <Link to="/create-account" className="hover:text-neon-blue hover:underline transition-colors">
              Create an account
            </Link>
          </div>
        </div>

        {/* Right side - Floating boy with background */}
        <div className="w-1/2.5 relative flex items-center justify-center bg-[#0a0b09]">
          {/* Neon floating boy */}
          <motion.img
            src={logo}
            alt="Boy floating"
            className="h-[80%] object-contain z-10"
            animate={{ y: [0, -30, 0] }} // subtle floating effect
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Optional subtle glow behind the boy */}
          <motion.div
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
