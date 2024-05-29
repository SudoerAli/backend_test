const fs = require('fs');
const path = require('path');
const itemsFilename = process.env.ITEMS_FILENAME || 'items.json';

let items = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'data', itemsFilename)).toString(),
);

async function createItem(itemData = {}) {
	const newItem = { ...itemData, id: items.length + 1, lastUpdate: new Date() };
	items = [...items, newItem];
	return newItem;
}

async function getAllItems() {
	return items;
}

async function findItem(id) {
	return items.find((i) => +i.id === +id);
}

async function updateItem(item, itemData = {}) {
	const updatedItem = { ...item, ...itemData, lastUpdate: new Date() };
	items = [...items.filter((i) => i.id !== item.id), updatedItem];
	return updatedItem;
}

async function deleteItem(item) {
	items = items.filter((i) => i.id !== item.id);
}

module.exports = { createItem, getAllItems, findItem, updateItem, deleteItem };
