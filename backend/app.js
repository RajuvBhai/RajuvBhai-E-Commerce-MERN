const express = require('express');
const app = express();
const errorMidleware = require('./midlewares/error');

app.use(express.json());
const products = require('./routes/productRoute');

app.use('/api/v1', products);

app.use(errorMidleware);

module.exports = app;