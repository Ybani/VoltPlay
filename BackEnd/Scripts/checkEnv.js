import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Checking environment variables:');
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('TOKEN_SECRET exists:', !!process.env.TOKEN_SECRET);
console.log('Mongo_url exists:', !!process.env.Mongo_url);

if (process.env.JWT_SECRET) {
    console.log('✅ JWT_SECRET is configured');
} else if (process.env.TOKEN_SECRET) {
    console.log('✅ TOKEN_SECRET is configured (used as fallback)');
} else {
    console.log('❌ No JWT secret found! Token generation will fail.');
}
