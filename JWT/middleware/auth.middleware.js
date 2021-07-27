const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET } = require('../config/config');
const { constant } = require('../constants');
const O_Auth = require('../dataBase/model/O_Auth');

module.exports = {
    checkIsTokenValid: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION);
            if (!access_token) {
                throw new Error('Token is required');
            }

            console.log(access_token);
            const tokens = await O_Auth.findOne({ access_token }).populate('user');
            console.log(tokens);
            if (!tokens) {
                throw new Error('not valid tokens');
            }
            await jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
                if (err) {
                    throw new Error('Not valid token');
                }
            });
            req.user = tokens.user;
            await next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
