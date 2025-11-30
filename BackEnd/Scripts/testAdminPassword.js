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
 * Script to test password verification for admin user
 */

const testAdminPassword = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        // Find admin user
        const adminEmail = 'admin@voltplay.com';
        const admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            console.log('❌ Admin user not found!');
            await mongoose.connection.close();
            return;
        }

        console.log('✅ Admin user found!');
        console.log('Testing password: Admin123!');

        // Test password comparison
        const isPasswordValid = await bcrypt.compare('Admin123!', admin.password);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Password verification result:', isPasswordValid);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        if (isPasswordValid) {
            console.log('✅ Password is CORRECT!');
        } else {
            console.log('❌ Password is INCORRECT!');
            console.log('This suggests a problem with password hashing or comparison.');
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
testAdminPassword();
