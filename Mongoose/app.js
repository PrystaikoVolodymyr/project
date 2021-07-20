const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./router/api.router');

const app = express();
_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.on('error', (error) => {
        console.log(error);
    });
}
app.listen(5000, () => {
    console.log('Port 5000 is working now ');
});
