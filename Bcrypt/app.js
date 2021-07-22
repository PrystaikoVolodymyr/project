const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./router/api.router');
const { MONGO_URL, PORT } = require('./configs/config');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Port ${PORT} Bcrypt is working now`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = require('mongoose');
    connection.on('error', (error) => {
        console.log(error);
    });
}
