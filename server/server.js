require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// 1. MIDDLEWARE (Must be before routes)
app.use(cors()); // This allows your Vue app to talk to this server
app.use(express.json()); // This allows the server to read JSON data

// 2. DATABASE CONNECTION
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err.message);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

// 3. THE ROUTES (The part you suspect is broken)

// Test Route (Check this at http://127.0.0.1:3000/)
app.get('/', (req, res) => {
    res.send("Backend Server is Live!");
});

// Car API Route (Check this at http://127.0.0.1:3000/api/cars)
app.get('/api/cars', (req, res) => {
    console.log("GET /api/cars request received"); // This will show in your terminal
    const sql = "SELECT * FROM cars";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 4. START SERVER
const PORT = process.env.PORT || 3000;
// We tell it to listen on 0.0.0.0 to accept connections from any local address
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running at http://127.0.0.1:${PORT}`);
});