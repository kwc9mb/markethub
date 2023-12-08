const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: String // or reference to a Product model if you have one
    }],
    market: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Market'
    },
    // Additional fields like 'contactInfo', 'ratings', etc. can be added here
});

module.exports = mongoose.model('Vendor', vendorSchema);
