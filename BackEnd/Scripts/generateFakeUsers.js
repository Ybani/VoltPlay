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
 * Script to generate fake users
 */

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Jessica', 'Daniel', 'Ashley', 'Matthew', 'Amanda', 'James', 'Melissa', 'Robert', 'Laura', 'William', 'Nicole', 'Richard', 'Stephanie'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'];

const generateFakeUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Password123!', salt);

        const users = [];
        const numberOfUsers = 25;

        for (let i = 0; i < numberOfUsers; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log(`⚠️  User ${email} already exists, skipping...`);
                continue;
            }

            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                isAdmin: false,
                phone: `555${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
                address: `${Math.floor(Math.random() * 9999)} ${lastName} Street`
            });

            users.push(user);
        }

        if (users.length > 0) {
            await User.insertMany(users);
            console.log(`✅ Created ${users.length} fake users successfully!`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 All users have password: Password123!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        } else {
            console.log('⚠️  No new users created (all already exist)');
        }

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error creating fake users:', error);
        process.exit(1);
    }
};

// Run the script
generateFakeUsers();
