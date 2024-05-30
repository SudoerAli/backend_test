const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Item = require('./src/items.model');
// Connection URL
const url = process.env.DB_HOST || '';

// JSON file with data
const itemsFilename = process.env.ITEMS_FILENAME || 'items.json';
// Load the items data from the json file
let data = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'data', itemsFilename)).toString(),
);

// Connect to the database
mongoose.connect(url)
    .then(() => {
        console.log("Connected successfully to the mongoDB database");

        // Insert the JSON data into the collection
        Item.insertMany(data)
            .then(() => {
                console.log("Inserted documents into items collection");
                mongoose.connection.close();
            })
            .catch(err => console.error(err));
    })
    .catch(err => console.error(err));