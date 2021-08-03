const { Schema, model } = require('mongoose');
const { dataBase: { O_AUTH, USER } } = require('../../constant');

const oAuthSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    user: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamps: true });

module.exports = model(O_AUTH, oAuthSchema);
