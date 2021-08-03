const jwt = require('jsonwebtoken');
const { constant } = require('../constant');
const O_Auth = require('../dataBase/model/O_Auth');

module.exports = {
    checkIsTokenValid: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION);
            if (!access_token) {
                throw new Error('Token is required');
            }

            const tokens = await O_Auth.findOne({ access_token }).populate('user');
            if (!tokens) {
                throw new Error('Not valid token');
            }
            await jwt.verify(access_token, 'JWT_SECRET', (err) => {
                if (err) {
                    throw new Error('Not valid token');
                }
            });
            console.log(tokens);
            req.tokens = tokens;
            await next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
