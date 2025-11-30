import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../Models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from BackEnd directory
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Script to create a default admin user
 * Run this script once to set up the admin account
 */

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        // Check if admin user already exists
        const adminEmail = 'admin@voltplay.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', adminEmail);
            console.log('Admin status:', existingAdmin.isAdmin);
            await mongoose.connection.close();
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin123!', salt);

        // Create admin user
        const adminUser = new User({
            firstName: 'Admin',
            lastName: 'VoltPlay',
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true,
            phone: '',
            address: ''
        });

        await adminUser.save();

        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email: admin@voltplay.com');
        console.log('🔑 Password: Admin123!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!');

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
};

// Run the script
createAdminUser();
