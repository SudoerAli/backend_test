const service = require('./items.service');

async function findItem(req, res, next, id) {
	const item = service.findItem(id);
	if (!item) {
		return res.status(404).json({
			message: 'invalid item',
			errors: { id: 'is unknown' },
		});
	}
	req.item = item;
	next();
}


async function createItem(req, res, next) {
	const newItem = service.createItem();
	return res.json({ item: newItem });
}

async function getAllItems(req, res, next) {
	// Get all items from the service
	let items = await service.getAllItems();

	// Filter the items by the filter_by query parameter
	const filterBy = req.query.filter_by;
	if (filterBy) {
		// If the filter_by query parameter is 'active', then get active items
		if (filterBy === 'active') {
			items = items.filter(item => item.isActive);
		// If the filter_by query parameter is 'inactive', then return inactive items
		} else if (filterBy === 'inactive') {
			items = items.filter(item => !item.isActive);
		} else {
			// If the filter_by query parameter is neither 'active' nor 'inactive', return an error
			return res.status(400).json({ error: 'Invalid filter_by parameter. Allowed values are "active" or "inactive".' });
		}
	}

	return res.json({ items });
}

async function getOneItem(req, res, next) {
	return res.json({ item: req.item });
}

async function updateItem(req, res, next) {
	return res.json({ item: service.updateItem(req.item, req.body.item || {}) });
}

async function deleteItem(req, res, next) {
	service.deleteItem(req.item);
	return res.json({ item: req.item });
}

// Export the controller functions
module.exports = {
	findItem,
	createItem,
	getAllItems,
	getOneItem,
	updateItem,
	deleteItem,
};
