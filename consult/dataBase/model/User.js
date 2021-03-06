const { Schema, model } = require('mongoose');
const { dataBase: { USER } } = require('../../constants');

const carSubSchema = {
    model: { type: String },
    year: { type: Number }
};
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false, required: true },
    yearOfBorn: { type: Number, required: true },
    work: { type: Boolean, default: false },
    car: [carSubSchema]
}, { timestamps: true });

module.exports = model(USER, userSchema);
