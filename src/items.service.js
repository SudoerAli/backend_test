const mongoose = require('mongoose');
const Item = require('./items.model');

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);
// Connection URL
const url = process.env.DB_HOST || '';

// Connect to the database
mongoose.connect(url)
	.then(() => {
		console.log("Connected successfully to server");
	})
	.catch(err => console.error(err));


// Function to create a new item
async function createItem(itemData = {}) {
	const numberOfItems = await Item.countDocuments({});
	const newItem = { ...itemData, id: numberOfItems + 1, lastUpdate: new Date() };
	// Create a new item in the database
	Item.create(newItem);
	return newItem;
}

// Function to get all items
async function getAllItems() {
	// Get all items from the database and return them
	return Item.find({}).exec();
}
// Function to find an item by id
async function findItem(id) {
	// Find the item in the database and return it
	return Item.findOne({ id: id }).exec();
}

// Function to update an item with new data
async function updateItem(item, itemData = {}) {
	const updatedItem = { ...item, ...itemData, lastUpdate: new Date() };
	// Update the item in the database
	Item.updateOne({ id: item.id }, updatedItem)
	return updatedItem;
}

// Function to delete an item
async function deleteItem(item) {
	// Delete the item from the database
	Item.deleteOne({ id: item.id });
}

module.exports = { createItem, getAllItems, findItem, updateItem, deleteItem };
