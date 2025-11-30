// seedAudioProducts.js
// Script to insert sample audio/headset products into the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../Models/Products.js';

// Resolve .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
    {
        name: 'HyperX Cloud II Gaming Headset',
        description: 'Closed-back, 7.1 virtual surround sound, USB and 3.5mm connectivity.',
        price: 99.99,
        category: 'audio',
        brand: 'HyperX',
        imageUrl: 'https://example.com/images/hyperx-cloud-ii.jpg',
        stock: 25,
        specs: { connectivity: 'USB/3.5mm', driverSize: '53mm' }
    },
    {
        name: 'SteelSeries Arctis 7 Wireless Headset',
        description: 'Lossless 2.4GHz wireless, DTS Headphone:X v2.0, comfortable ski goggle headband.',
        price: 149.99,
        category: 'audio',
        brand: 'SteelSeries',
        imageUrl: 'https://example.com/images/steelseries-arctis7.jpg',
        stock: 15,
        specs: { wireless: true, batteryLife: '24h' }
    },
    {
        name: 'Razer Kraken X Gaming Headset',
        description: 'Lightweight, 50mm drivers, 7.1 surround sound via USB.',
        price: 49.99,
        category: 'audio',
        brand: 'Razer',
        imageUrl: 'https://example.com/images/razer-kraken-x.jpg',
        stock: 30,
        specs: { driverSize: '50mm', surround: '7.1' }
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');
        await Product.insertMany(products);
        console.log('✅ Audio products seeded successfully');
    } catch (err) {
        console.error('❌ Error seeding audio products:', err);
    } finally {
        await mongoose.disconnect();
        console.log('✅ DB connection closed');
    }
};

seed();
