# VoltPlay

VoltPlay is a modern e-commerce application for gaming peripherals. It features a React-based frontend with smooth animations and a Node.js/Express backend for authentication and data management.

## Features

### FrontEnd
- **Modern UI**: Built with React, Vite, and Tailwind CSS.
- **Animations**: Smooth transitions using Framer Motion.
- **Pages**:
  - Home
  - Keyboards
  - Login
  - Create Account
  - Mice, Console, Monitors, Audio (Placeholders)

### BackEnd
- **API**: RESTful API built with Express.js.
- **Database**: MongoDB integration via Mongoose.
- **Authentication**: JWT-based authentication (Register endpoint implemented).
- **CRUD Operations**: Full user management endpoints.

## Prerequisites

- **Node.js**: v14 or higher
- **MongoDB**: Local installation or MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install BackEnd Dependencies**
   ```bash
   cd BackEnd
   npm install
   ```

3. **Install FrontEnd Dependencies**
   ```bash
   cd FrontEnd
   npm install
   ```

### Running the Application

1. **Start the BackEnd Server**
   ```bash
   cd BackEnd
   npm start
   ```
   The server will run on port specified in `.env` (default: 6969).

2. **Start the FrontEnd Development Server**
   ```bash
   cd FrontEnd
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Configuration

### Environment Variables

Create a `.env` file in the `BackEnd` directory:

```env
PORT=6969
Mongo_url=mongodb://localhost:27017/voltplay
JWT_SECRET=your_secret_key_here
```

**For MongoDB Atlas (cloud)**, use:
```env
Mongo_url=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/voltplay?retryWrites=true&w=majority
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user

### Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `GET /api/users/search?q=searchterm`: Search users
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

## MongoDB Guide

For a complete guide on working with MongoDB and Mongoose, see [MONGODB_GUIDE.md](./MONGODB_GUIDE.md).

## Technologies Used

- **FrontEnd**: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router DOM.
- **BackEnd**: Node.js, Express, Mongoose, JSON Web Token, BcryptJS, Dotenv, Cors.
