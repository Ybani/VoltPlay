// checkAudioProducts.js
// Script to check existing audio products in the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../Models/Products.js';

// Resolve .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        const audioProducts = await Product.find({ category: 'audio' });
        console.log(`\n📊 Found ${audioProducts.length} audio products in database:\n`);

        if (audioProducts.length === 0) {
            console.log('❌ No audio products found!');
        } else {
            audioProducts.forEach((product, index) => {
                console.log(`${index + 1}. ${product.name}`);
                console.log(`   Brand: ${product.brand}`);
                console.log(`   Price: $${product.price}`);
                console.log(`   Stock: ${product.stock}`);
                console.log('');
            });
        }
    } catch (err) {
        console.error('❌ Error checking audio products:', err);
    } finally {
        await mongoose.disconnect();
        console.log('✅ DB connection closed');
    }
};

checkProducts();
