# MongoDB & Mongoose Complete Guide

## 🎯 What You Have

✅ **MongoDB Server**: Running on your PC  
✅ **Mongoose**: Already installed (MongoDB ORM/ODM)  
✅ **Connection Setup**: Already configured in `config/DB.js`  

## 📝 Step 1: Configure Your Connection

Update your `.env` file with:
```env
PORT=6969
Mongo_url=mongodb://localhost:27017/voltplay
JWT_SECRET=your_secret_key_here
```

## 🔌 Step 2: Understanding the Connection

Your `config/DB.js` already connects to MongoDB:
```javascript
import mongoose from 'mongoose';
mongoose.connect(process.env.Mongo_url)
  .then(() => console.log("cnx to DB succeded"))
  .catch((err) => console.log("cnx to DB failed", err.message));
```

## 📊 Step 3: How Mongoose Works (Schemas & Models)

### What is a Schema?
A **Schema** defines the structure of your documents (like a blueprint).

### What is a Model?
A **Model** is a class that allows you to interact with the database (CRUD operations).

### Example: User Model (already in your project)
```javascript
import mongoose from 'mongoose';

// 1. Define Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,      // Data type
        required: true,    // Must be provided
        trim: true         // Remove whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,      // No duplicates
        lowercase: true
    },
    isAdmin: {
        type: Boolean,
        default: false     // Default value
    }
}, { timestamps: true });  // Auto-add createdAt, updatedAt

// 2. Create Model
const User = mongoose.model('User', userSchema);

export default User;
```

## 🛠️ Step 4: CRUD Operations

### **CREATE** - Add new data
```javascript
import { User } from './Models/User.js';

// Create a new user
const newUser = new User({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "hashedpassword"
});

await newUser.save();
// OR
await User.create({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "hashedpassword"
});
```

### **READ** - Get data
```javascript
// Find all users
const users = await User.find();

// Find one user by email
const user = await User.findOne({ email: "john@example.com" });

// Find by ID
const user = await User.findById("60d5ec49f1a2c72f4c8b4567");

// Find with conditions
const admins = await User.find({ isAdmin: true });

// Find with select (only get specific fields)
const users = await User.find().select('firstName email -_id');
```

### **UPDATE** - Modify data
```javascript
// Update one user
await User.updateOne(
    { email: "john@example.com" },  // Filter
    { firstName: "Johnny" }          // Update
);

// Find and update
const updatedUser = await User.findOneAndUpdate(
    { email: "john@example.com" },
    { address: "123 Main St" },
    { new: true }  // Return updated document
);

// Update by ID
await User.findByIdAndUpdate(userId, { isAdmin: true });
```

### **DELETE** - Remove data
```javascript
// Delete one user
await User.deleteOne({ email: "john@example.com" });

// Find and delete
await User.findOneAndDelete({ email: "john@example.com" });

// Delete by ID
await User.findByIdAndDelete(userId);

// Delete many
await User.deleteMany({ isAdmin: false });
```

## 🎨 Step 5: Advanced Mongoose Features

### Query Chaining
```javascript
const users = await User
    .find({ isAdmin: false })
    .sort({ createdAt: -1 })    // Sort descending
    .limit(10)                   // Get only 10
    .skip(20)                    // Skip first 20 (pagination)
    .select('firstName email');  // Only these fields
```

### Population (Join-like)
```javascript
// In Product schema
const productSchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Reference to User model
    }
});

// Query with population
const product = await Product.findById(id).populate('createdBy');
// Now product.createdBy will have full user data
```

### Validation
```javascript
const userSchema = new mongoose.Schema({
    age: {
        type: Number,
        min: 18,           // Minimum value
        max: 100,          // Maximum value
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],  // Custom error
        match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator']  // Only these values
    }
});
```

## 📦 Example: Complete Controller

```javascript
import { User } from '../Models/User.js';

// Create User
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get All Users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
```

## 🎓 Common Schema Types

```javascript
{
    stringField: String,
    numberField: Number,
    dateField: Date,
    booleanField: Boolean,
    arrayField: [String],
    objectField: {
        nested: String
    },
    mixedField: mongoose.Schema.Types.Mixed,
    objectIdField: mongoose.Schema.Types.ObjectId
}
```

## 🔥 Quick Tips

1. **Always use try-catch** in async operations
2. **Use validation** (Joi + Mongoose validation)
3. **Select fields carefully** (don't expose passwords)
4. **Use indexes** for frequently queried fields
5. **Use timestamps** `{ timestamps: true }`
6. **Use lean()** for read-only queries (faster)

## 📚 Next Steps

1. Fix `Products.js` model (it has a bug: `type: number` should be `type: Number`)
2. Create controllers for CRUD operations
3. Add routes for your APIs
4. Test with Postman or Thunder Client

## 🔗 Useful Resources

- [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI for MongoDB
