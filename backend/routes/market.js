const express = require('express');
const router = express.Router();
// Assume Market is a Mongoose model you've defined in models/Market.js
const Market = require('../models/Market');

// Get all markets
router.get('/', async (req, res) => {
    try {
        const markets = await Market.find();
        res.json(markets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific market
router.get('/:id', getMarket, (req, res) => {
    res.json(res.market);
});

// Create a new market
router.post('/', async (req, res) => {
    const market = new Market({
        // Set properties from req.body
    });
    try {
        const newMarket = await market.save();
        res.status(201).json(newMarket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a market by ID
async function getMarket(req, res, next) {
    let market;
    try {
        market = await Market.findById(req.params.id);
        if (market == null) {
            return res.status(404).json({ message: 'Cannot find market' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.market = market;
    next();
}

module.exports = router;
