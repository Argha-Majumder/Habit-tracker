const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DATABASE_URL;

mongoose.connect(DB)
    .then(()=>console.log("Connection successful"))
    .catch((err)=>console.log(`Connection problem : ${err}`));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function() {
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;