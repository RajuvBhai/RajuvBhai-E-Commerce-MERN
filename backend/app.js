const express = require('express');
const app = express();
const errorMidleware = require('./midlewares/error');

app.use(express.json());
const products = require('./routes/productRoute');
const auth = require('./routes/authRoute');

app.use('/api/v1', products);
app.use('/api/v1', auth);

app.use(errorMidleware);

module.exports = app;