const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
    .then(() => console.log('DB Connection successful'));

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log(`Listening to port: ${port}....`)
})
