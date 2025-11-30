import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/boy.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please enter both email and password",
        background: "#1a1a24",
        color: "#fff",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:6969/api/auth/login", {
        email,
        password,
      });

      // Use AuthContext to store user data
      login(response.data.user, response.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${response.data.user.firstName}!`,
        background: "#1a1a24",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect based on user role
      setTimeout(() => {
        if (response.data.user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password",
        background: "#1a1a24",
        color: "#fff",
      });
    } finally {
      setLoading(false);
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

          <form onSubmit={handleLogin} className="w-full">
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
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
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
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
                "&:disabled": {
                  background: "#333",
                  color: "#666",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Connect"}
            </Button>
          </form>

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
