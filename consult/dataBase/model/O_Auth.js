const { Schema, model } = require('mongoose');
const { dataBase: { O_AUTH, USER } } = require('../../constants');

const oAuthScheme = new Schema({
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamps: true });

module.exports = model(O_AUTH, oAuthScheme);
