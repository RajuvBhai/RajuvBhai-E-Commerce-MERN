const express = require('express');
const app = express();
const errorMidleware = require('./midlewares/error');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const products = require('./routes/productRoute');
const auth = require('./routes/authRoute');

app.use('/api/v1', products);
app.use('/api/v1', auth);

app.use(errorMidleware);

module.exports = app;