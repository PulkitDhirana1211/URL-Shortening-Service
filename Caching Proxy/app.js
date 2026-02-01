const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the server');
    next();
})

app.use('/', routes)

module.exports = app;