
const mongoose = require('mongoose');

// Define basic item schema
const itemSchema = new mongoose.Schema({
    id: Number,
    isActive: Boolean
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;