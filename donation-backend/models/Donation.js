// models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    imagePaths: { type: [String], required: true },
});

module.exports = mongoose.model('Donation', donationSchema);
