const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');



// Update by Valeed Anjum


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const url = 'mongodb://team3:team3@localhost:27017';
const dbName = 'storefront';

// MongoDB connection function
async function connectToMongo() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        
        // Create collections if they don't exist
        await Promise.all([
            db.createCollection('shoppers'),
            db.createCollection('products'),
            db.createCollection('shopping_carts'),
            db.createCollection('shipping'),
            db.createCollection('billing')
        ]);
        
        console.log('Connected to MongoDB and created collections');
        return db;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

// Initialize database connection
let db;
connectToMongo().then(database => {
    db = database;
});

// API endpoints
app.post('/api/cart', async (req, res) => {
    try {
        const result = await db.collection('shopping_carts').insertOne(req.body);
        res.json({ success: true, id: result.insertedId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/shipping', async (req, res) => {
    try {
        const result = await db.collection('shipping').insertOne(req.body);
        res.json({ success: true, id: result.insertedId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/billing', async (req, res) => {
    try {
        const result = await db.collection('billing').insertOne(req.body);
        res.json({ success: true, id: result.insertedId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});