import mongoose from 'mongoose';
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
 * Script to check if admin user exists and view its details
 */

const checkAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        // Find admin user
        const adminEmail = 'admin@voltplay.com';
        const admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            console.log('❌ Admin user not found!');
        } else {
            console.log('✅ Admin user found!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('Email:', admin.email);
            console.log('First Name:', admin.firstName);
            console.log('Last Name:', admin.lastName);
            console.log('Is Admin:', admin.isAdmin);
            console.log('Password Hash (first 50 chars):', admin.password.substring(0, 50) + '...');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

// Run the script
checkAdminUser();
