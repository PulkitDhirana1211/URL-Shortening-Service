const express = require('express');
const urlRouter = require('./routes/urlRoutes');
const globalErrorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//     console.log('Hello from the server 😁');
//     next();
// })

app.use('/shorten', urlRouter);

app.use(globalErrorHandler);

module.exports = app;