// getAudioProductDetails.js
// Script to get detailed info about audio products
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../Models/Products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const getDetails = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB\n');

        const audioProducts = await Product.find({ category: 'audio' });

        audioProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name}`);
            console.log(`   ID: ${product._id}`);
            console.log(`   Brand: ${product.brand}`);
            console.log(`   Price: $${product.price}`);
            console.log(`   Stock: ${product.stock}`);
            console.log(`   Image URL: ${product.imageUrl}`);
            console.log(`   Description: ${product.description.substring(0, 60)}...`);
            console.log('');
        });
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

getDetails();
