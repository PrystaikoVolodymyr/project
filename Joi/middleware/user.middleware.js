const User = require('../dataBase/model/User');
const errorCodes = require('../constants/errorCodes.enum');
const errorMessage = require('../error/error.message');

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            if (userId.length !== 24) {
                throw new Error(errorMessage.BAD_ID);
            }
            await next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    checkIsUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;
            if (await User.findOne({ email })) {
                throw new Error(errorMessage.BAD_USER);
            }
            await next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
