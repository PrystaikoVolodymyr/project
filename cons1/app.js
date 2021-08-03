const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { MONGO_URL, PORT } = require('./config/config');
const apiRouter = require('./router/api.router');

_connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Port ${PORT} cons1 is working now`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = require('mongoose');
    connection.on('error', (error) => {
        console.log(error);
    });
}
