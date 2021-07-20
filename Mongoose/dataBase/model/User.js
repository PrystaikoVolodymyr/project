const { Schema, model } = require('mongoose');

const carSubSchema = {
    model: { type: String },
    prise: { type: Number },
};
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    car: [carSubSchema],
    work: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = model('User', userSchema);
