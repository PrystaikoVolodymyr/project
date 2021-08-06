const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const apiRouter = require('./router/api.router');
const { MONGO_URL, PORT } = require('./configs/config');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    const status = err.status || 500;
    res
        .status(status)
        .json({
            code: err.customCode || 4000,
            message: err.message || '',
        });
});

app.listen(PORT, () => {
    console.log(`Port ${PORT}  is working now`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = require('mongoose');
    connection.on('error', (error) => {
        console.log(error);
    });
}
