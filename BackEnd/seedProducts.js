// Sample Product Data Seeder
// Run this file to add sample products to the database
// Usage: node seedProducts.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './Models/Products.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.Mongo_url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const sampleProducts = [
    // KEYBOARDS
    {
        name: "Keychron Q1 Pro",
        description: "Wireless custom mechanical keyboard with QMK/VIA support and premium aluminum body.",
        price: 199.99,
        category: "keyboards",
        brand: "Keychron",
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
        stock: 30,
        specs: { switch: "Red/Brown/Banana", layout: "75%", wireless: true }
    },
    {
        name: "Razer BlackWidow V4 Pro",
        description: "Immersive mechanical gaming keyboard with Razer Chroma RGB and command dial.",
        price: 229.99,
        category: "keyboards",
        brand: "Razer",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b91add4?w=500",
        stock: 25,
        specs: { switch: "Green/Yellow", layout: "Full Size", wireless: false }
    },
    {
        name: "SteelSeries Apex Pro TKL",
        description: "World's fastest keyboard with OmniPoint 2.0 adjustable actuation switches.",
        price: 189.99,
        category: "keyboards",
        brand: "SteelSeries",
        imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500",
        stock: 40,
        specs: { switch: "OmniPoint 2.0", layout: "TKL", wireless: true }
    },
    {
        name: "Logitech G915 TKL",
        description: "Ultra-thin wireless mechanical gaming keyboard with LIGHTSPEED wireless technology.",
        price: 229.99,
        category: "keyboards",
        brand: "Logitech",
        imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b909?w=500",
        stock: 35,
        specs: { switch: "GL Tactile/Linear/Clicky", layout: "TKL", wireless: true }
    },
    {
        name: "Corsair K70 RGB PRO",
        description: "Iconic mechanical gaming keyboard with durable aluminum frame and CHERRY MX switches.",
        price: 169.99,
        category: "keyboards",
        brand: "Corsair",
        imageUrl: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500",
        stock: 50,
        specs: { switch: "Cherry MX Red/Speed", layout: "Full Size", wireless: false }
    },
    {
        name: "Anne Pro 2",
        description: "60% mechanical keyboard with Bluetooth 4.0 and fully programmable keys.",
        price: 89.99,
        category: "keyboards",
        brand: "Obinslab",
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
        stock: 60,
        specs: { switch: "Gateron Red/Brown/Blue", layout: "60%", wireless: true }
    },

    // MICE
    {
        name: "Logitech G Pro X Superlight",
        description: "Ultra-lightweight wireless gaming mouse with HERO 25K sensor. Perfect for competitive gaming.",
        price: 149.99,
        category: "mice",
        brand: "Logitech",
        imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        stock: 45,
        specs: { dpi: 25600, wireless: true, weight: "63g" }
    },
    {
        name: "Razer DeathAdder V3 Pro",
        description: "Iconic ergonomic design with Focus Pro 30K Optical Sensor. Built for precision and comfort.",
        price: 129.99,
        category: "mice",
        brand: "Razer",
        imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
        stock: 32,
        specs: { dpi: 30000, wireless: true, weight: "64g" }
    },
    {
        name: "SteelSeries Rival 5",
        description: "9-button programmable gaming mouse with TrueMove Air sensor for competitive play.",
        price: 59.99,
        category: "mice",
        brand: "SteelSeries",
        imageUrl: "https://images.unsplash.com/photo-1586920740099-e1c827d03e60?w=500",
        stock: 58,
        specs: { dpi: 18000, wireless: false, weight: "85g" }
    },
    {
        name: "Corsair Dark Core RGB Pro",
        description: "Wireless gaming mouse with Qi charging, customizable weights and RGB lighting.",
        price: 89.99,
        category: "mice",
        brand: "Corsair",
        imageUrl: "https://images.unsplash.com/photo-1589236956533-8a8177fc8762?w=500",
        stock: 27,
        specs: { dpi: 18000, wireless: true, weight: "142g" }
    },
    {
        name: "Glorious Model O Wireless",
        description: "Honeycomb shell ultralight wireless mouse. Gaming performance meets stunning design.",
        price: 79.99,
        category: "mice",
        brand: "Glorious",
        imageUrl: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=500",
        stock: 41,
        specs: { dpi: 19000, wireless: true, weight: "69g" }
    },
    {
        name: "HyperX Pulsefire Haste",
        description: "Ultra-lightweight hex shell design with TruMove Pixart sensor for fast-paced gaming.",
        price: 49.99,
        category: "mice",
        brand: "HyperX",
        imageUrl: "https://images.unsplash.com/photo-1611532736475-4f072c4e4bdc?w=500",
        stock: 62,
        specs: { dpi: 16000, wireless: false, weight: "59g" }
    },

    // CONSOLES
    {
        name: "PlayStation 5",
        description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.",
        price: 499.99,
        category: "consoles",
        brand: "Sony",
        imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
        stock: 15,
        specs: { storage: "825GB SSD", resolution: "4K 120Hz", cpu: "AMD Zen 2" }
    },
    {
        name: "Xbox Series X",
        description: "Most powerful Xbox ever. True 4K gaming at 120FPS with Quick Resume for multiple games.",
        price: 499.99,
        category: "consoles",
        brand: "Microsoft",
        imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500",
        stock: 18,
        specs: { storage: "1TB SSD", resolution: "4K 120Hz", cpu: "AMD Zen 2" }
    },
    {
        name: "Nintendo Switch OLED",
        description: "Handheld gaming console with vibrant 7-inch OLED screen, enhanced audio, and wide adjustable stand.",
        price: 349.99,
        category: "consoles",
        brand: "Nintendo",
        imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
        stock: 34,
        specs: { storage: "64GB", screen: "7-inch OLED", portable: true }
    },
    {
        name: "Steam Deck",
        description: "Portable PC gaming powerhouse. Play your Steam library anywhere with powerful AMD APU.",
        price: 399.99,
        category: "consoles",
        brand: "Valve",
        imageUrl: "https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?w=500",
        stock: 22,
        specs: { storage: "64GB-512GB", screen: "7-inch LCD", portable: true }
    },

    // MONITORS
    {
        name: "ASUS ROG Swift PG279QM",
        description: "27-inch 1440p 240Hz gaming monitor with G-SYNC and Fast IPS technology for blur-free gaming.",
        price: 699.99,
        category: "monitors",
        brand: "ASUS",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        stock: 12,
        specs: { size: '27"', resolution: "2560x1440", refreshRate: "240Hz" }
    },
    {
        name: "LG 27GP950-B UltraGear",
        description: "4K 144Hz Nano IPS monitor with HDMI 2.1 for next-gen console gaming. HDR600 certified.",
        price: 799.99,
        category: "monitors",
        brand: "LG",
        imageUrl: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
        stock: 9,
        specs: { size: '27"', resolution: "3840x2160", refreshRate: "144Hz" }
    },
    {
        name: "Samsung Odyssey G7",
        description: "32-inch curved 1440p 240Hz QLED gaming monitor with 1000R curvature for immersive gaming.",
        price: 599.99,
        category: "monitors",
        brand: "Samsung",
        imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500",
        stock: 15,
        specs: { size: '32"', resolution: "2560x1440", refreshRate: "240Hz", curved: true }
    },
    {
        name: "Dell S2721DGF",
        description: "27-inch 1440p 165Hz IPS gaming monitor with excellent color accuracy and FreeSync Premium Pro.",
        price: 429.99,
        category: "monitors",
        brand: "Dell",
        imageUrl: "https://images.unsplash.com/photo-1551645120-d70d9d3c4b28?w=500",
        stock: 24,
        specs: { size: '27"', resolution: "2560x1440", refreshRate: "165Hz" }
    },
    {
        name: "BenQ ZOWIE XL2546K",
        description: "24.5-inch 1080p 240Hz DyAc+ esports monitor designed for competitive FPS gaming.",
        price: 499.99,
        category: "monitors",
        brand: "BenQ",
        imageUrl: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500",
        stock: 18,
        specs: { size: '24.5"', resolution: "1920x1080", refreshRate: "240Hz" }
    },
    {
        name: "Acer Predator X38",
        description: "38-inch ultrawide curved 1600p 175Hz gaming monitor with G-SYNC Ultimate for immersive gaming.",
        price: 1299.99,
        category: "monitors",
        brand: "Acer",
        imageUrl: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=500",
        stock: 7,
        specs: { size: '38"', resolution: "3840x1600", refreshRate: "175Hz", curved: true }
    },

    // AUDIO
    {
        name: "SteelSeries Arctis Nova Pro Wireless",
        description: "Premium wireless gaming headset with active noise cancellation and dual battery system.",
        price: 349.99,
        category: "audio",
        brand: "SteelSeries",
        imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
        stock: 28,
        specs: { wireless: true, anc: true, batteryLife: "44 hours" }
    },
    {
        name: "HyperX Cloud Alpha Wireless",
        description: "300-hour battery life wireless gaming headset with DTS Headphone:X Spatial Audio.",
        price: 199.99,
        category: "audio",
        brand: "HyperX",
        imageUrl: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
        stock: 35,
        specs: { wireless: true, batteryLife: "300 hours", surround: "DTS:X" }
    },
    {
        name: "Razer BlackShark V2 Pro",
        description: "Wireless esports headset with THX Spatial Audio and titanium-coated drivers.",
        price: 179.99,
        category: "audio",
        brand: "Razer",
        imageUrl: "https://images.unsplash.com/photo-1577174881658-0f30157e9df2?w=500",
        stock: 42,
        specs: { wireless: true, batteryLife: "24 hours", surround: "THX Spatial" }
    },
    {
        name: "Logitech G Pro X Wireless",
        description: "Professional gaming headset with Blue VO!CE mic technology. Trusted by esports pros.",
        price: 199.99,
        category: "audio",
        brand: "Logitech",
        imageUrl: "https://images.unsplash.com/photo-1590658165737-15a047b7a45e?w=500",
        stock: 31,
        specs: { wireless: true, batteryLife: "20 hours", detachableMic: true }
    },
    {
        name: "Corsair HS80 RGB Wireless",
        description: "Premium multi-platform wireless gaming headset with Dolby Atmos and custom-tuned 50mm drivers.",
        price: 149.99,
        category: "audio",
        brand: "Corsair",
        imageUrl: "https://images.unsplash.com/photo-1612732810319-f0b2b5c5f30f?w=500",
        stock: 47,
        specs: { wireless: true, batteryLife: "20 hours", surround: "Dolby Atmos" }
    },
    {
        name: "Astro A50 Wireless",
        description: "Premium wireless gaming headset with base station, Dolby Audio, and 15-hour battery life.",
        price: 299.99,
        category: "audio",
        brand: "Astro",
        imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
        stock: 20,
        specs: { wireless: true, batteryLife: "15 hours", baseStation: true }
    }
];

async function seedDatabase() {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log(`Added ${sampleProducts.length} sample products`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
