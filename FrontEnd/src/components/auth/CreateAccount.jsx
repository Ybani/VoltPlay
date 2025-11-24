import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/boy.png';
import Swal from 'sweetalert2';
import axios from 'axios';

function CreateAccount() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            Swal.fire({
                title: "Invalid Password",
                text: "Password must be at least 8 characters long and contain at least one capital letter.",
                icon: "error",
                timer: 3000,
                background: '#0a0a0f',
                color: '#fff',
                showConfirmButton: true
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                title: "Passwords do not match",
                icon: "error",
                background: '#0a0a0f',
                color: '#fff',
                iconColor: '#60a5fa',
                customClass: {
                    popup: 'border border-blue-500/30',
                },
                showConfirmButton: true
            });
            return;
        }
        try {
            const res = await axios.post("http://localhost:6969/api/auth/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            Swal.fire({
                title: "User created !",
                text: "Your account has been successfully created.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                draggable: true
            }); // should say "User created"
            console.log(res.data.user); // user document from MongoDB
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.log(err.response?.data || err);
            Swal.fire({
                title: "Erreur",
                text: err.response?.data?.message || "Error creating user",
                icon: "error",
                timer: 3000,
                background: '#0a0a0f',
                color: '#fff',
                showConfirmButton: true,
                draggable: true
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
            <div className="flex w-[1000px] h-[650px] bg-bg-800 rounded-4xl  overflow-hidden">

                {/* Left side - Create Account form */}
                <div className="flex flex-col justify-center items-center w-1/2 p-10">
                    <h2 className="text-4xl font-bold bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent drop-shadow-[0_0_10px_var(--color-neon-blue)] mb-2">Create Account</h2>
                    <p className="text-gray-300 text-sm mb-8 text-center">
                        Join MyBookShelf and start exploring our library
                    </p>

                    <form onSubmit={handleSubmit} className="w-full">
                        {/* First Name */}
                        <TextField
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            value={formData.firstName}
                            onChange={handleChange}
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
                            required
                        />

                        {/* Last Name */}
                        <TextField
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            value={formData.lastName}
                            onChange={handleChange}
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
                            required
                        />

                        {/* Email */}
                        <TextField
                            label="email"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
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
                            required
                        />

                        {/* Password */}
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
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
                            required
                        />

                        {/* Confirm Password */}
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
                            required
                        />

                        {/* Create Account button */}
                        <Button
                            type="submit"
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
                            Create Account
                        </Button>
                    </form>

                    {/* Footer text */}
                    <div className="flex justify-center w-full mt-4 text-sm text-gray-400">
                        <span>Already have an account? </span>
                        <Link to="/login" className="hover:text-neon-blue hover:underline transition-colors font-semibold ml-1">
                            Sign In
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

export default CreateAccount;