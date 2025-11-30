// updateAudioProductImages.js
// Script to update placeholder image URLs with real working URLs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../Models/Products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB\n');

        // Update HyperX Cloud II
        const hyperxUpdate = await Product.findOneAndUpdate(
            { name: 'HyperX Cloud II Gaming Headset' },
            {
                imageUrl: 'https://m.media-amazon.com/images/I/61-QJiKD0gL._AC_SL1500_.jpg',
                description: 'Closed-back gaming headset with 7.1 virtual surround sound, USB and 3.5mm connectivity, memory foam ear cushions.'
            },
            { new: true }
        );
        console.log('✅ Updated HyperX Cloud II:', hyperxUpdate ? 'Success' : 'Not found');

        // Update SteelSeries Arctis 7
        const steelseriesUpdate = await Product.findOneAndUpdate(
            { name: 'SteelSeries Arctis 7 Wireless Headset' },
            {
                imageUrl: 'https://media.steelseriescdn.com/thumbs/catalogue/products/00829-arctis-7/c0d63a94d5d74b2d9bb4d0e3e0c0c3e7.png.500x400_q100_crop-fit_optimize.png',
                description: 'Lossless 2.4GHz wireless gaming headset with DTS Headphone:X v2.0, comfortable ski goggle headband, 24-hour battery life.'
            },
            { new: true }
        );
        console.log('✅ Updated SteelSeries Arctis 7:', steelseriesUpdate ? 'Success' : 'Not found');

        // Update Razer Kraken X
        const razerUpdate = await Product.findOneAndUpdate(
            { name: 'Razer Kraken X Gaming Headset' },
            {
                imageUrl: 'https://assets2.razerzone.com/images/pnx.assets/618c0b65424070a1017a7168/razer-kraken-x-500x500.png',
                description: 'Lightweight gaming headset with 50mm drivers, 7.1 surround sound via USB, bendable cardioid microphone.'
            },
            { new: true }
        );
        console.log('✅ Updated Razer Kraken X:', razerUpdate ? 'Success' : 'Not found');

        console.log('\n✅ All product images updated successfully!');

    } catch (err) {
        console.error('❌ Error updating products:', err);
    } finally {
        await mongoose.disconnect();
        console.log('✅ DB connection closed');
    }
};

updateImages();
