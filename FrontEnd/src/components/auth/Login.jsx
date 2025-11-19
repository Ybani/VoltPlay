import React from "react";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../assets/boy.png';

function Login() {
  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-[#0a0b09]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card */}
      <div className="flex w-[900px] h-[550px] bg-[#1a1a24] rounded-2xl  overflow-hidden">
        
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
            animate={{ y: [0, -20, 0] }} // subtle floating effect
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
