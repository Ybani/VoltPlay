// testLoginRequest.js
// Simple script to test admin login via the backend API using CommonJS syntax
const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Sending login request to http://localhost:6969/api/auth/login');
        const response = await axios.post('http://localhost:6969/api/auth/login', {
            email: 'admin@voltplay.com',
            password: 'Admin123!'
        });
        console.log('Status:', response.status);
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error during login request:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
};

testLogin();
