const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;

const db = 'mongodb+srv://' + DB_USER + ':' + DB_PASS + '@cluster0.wm7aqyj.mongodb.net/' + DB_NAME + '?retryWrites=true&w=majority';

const connection = mongoose.connect(db, {
    useNewUrlParser: true
})

module.exports = connection