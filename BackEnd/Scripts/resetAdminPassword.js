import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../Models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const resetAdminPassword = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        const adminEmail = 'admin@voltplay.com';
        const newPassword = 'Admin123!';

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the admin user
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            { password: hashedPassword, isAdmin: true },
            { new: true }
        );

        if (admin) {
            console.log('✅ Password reset successfully!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 Email: admin@voltplay.com');
            console.log('🔑 Password: Admin123!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        } else {
            console.log('❌ Admin user not found!');
        }

        await mongoose.connection.close();
        console.log('✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error resetting password:', error);
        process.exit(1);
    }
};

resetAdminPassword();
