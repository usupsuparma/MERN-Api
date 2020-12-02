const express = require('express');

const app = express();
const productRoutes = require('./src/routes/products');

app.use('/', productRoutes);

// get '/users/ ==> [{name: usup}]

app.listen(4000);