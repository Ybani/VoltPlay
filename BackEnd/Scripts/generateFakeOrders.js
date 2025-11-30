import mongoose from 'mongoose';
import { Order } from '../Models/Order.js';
import { User } from '../Models/User.js';
import { Product } from '../Models/Products.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from BackEnd directory
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Script to generate fake orders
 */

const statuses = ['completed', 'completed', 'completed', 'completed', 'pending', 'processing', 'cancelled'];
const paymentMethods = ['credit_card', 'paypal', 'cash'];

const generateRandomDate = (monthsAgo) => {
    const now = new Date();
    const past = new Date();
    past.setMonth(now.getMonth() - monthsAgo);
    const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
    return new Date(randomTime);
};

const generateFakeOrders = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.Mongo_url);
        console.log('✅ Connected to MongoDB');

        // Get all users and products
        const users = await User.find({ isAdmin: false });
        const products = await Product.find();

        if (users.length === 0) {
            console.log('❌ No users found. Please run generateFakeUsers.js first.');
            await mongoose.connection.close();
            return;
        }

        if (products.length === 0) {
            console.log('❌ No products found. Please add products first.');
            await mongoose.connection.close();
            return;
        }

        const orders = [];
        const numberOfOrders = 75;

        for (let i = 0; i < numberOfOrders; i++) {
            // Random user
            const user = users[Math.floor(Math.random() * users.length)];

            // Random 1-4 products
            const numberOfItems = Math.floor(Math.random() * 4) + 1;
            const items = [];
            let totalAmount = 0;

            for (let j = 0; j < numberOfItems; j++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const quantity = Math.floor(Math.random() * 3) + 1;
                const price = product.price;

                items.push({
                    productId: product._id,
                    productName: product.name,
                    quantity,
                    price
                });

                totalAmount += price * quantity;
            }

            const orderNumber = `ORD-${Date.now()}-${i.toString().padStart(4, '0')}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
            const createdAt = generateRandomDate(6); // Random date within last 6 months

            const order = new Order({
                orderNumber,
                customer: {
                    userId: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email
                },
                items,
                totalAmount,
                status,
                paymentMethod,
                shippingAddress: user.address || `${Math.floor(Math.random() * 9999)} Main Street`,
                createdAt,
                updatedAt: createdAt
            });

            orders.push(order);
        }

        await Order.insertMany(orders);
        console.log(`✅ Created ${orders.length} fake orders successfully!`);

        // Calculate statistics
        const completedOrders = orders.filter(o => o.status === 'completed');
        const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalItems = completedOrders.reduce((sum, o) => {
            return sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
        }, 0);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📦 Total Orders: ${orders.length}`);
        console.log(`✅ Completed Orders: ${completedOrders.length}`);
        console.log(`💰 Total Revenue: $${totalRevenue.toFixed(2)}`);
        console.log(`📊 Total Items Sold: ${totalItems}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error creating fake orders:', error);
        process.exit(1);
    }
};

// Run the script
generateFakeOrders();
