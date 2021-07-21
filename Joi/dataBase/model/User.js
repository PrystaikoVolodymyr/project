const { Schema, model } = require('mongoose');

const carSubScheme = {
    model: { type: String },
    year: { type: Number }
};

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    yearOfBorn: { type: Number, required: true },
    work: { type: Boolean, default: false },
    car: [carSubScheme]
}, { timestamps: true });

module.exports = model('User', userSchema);
