const User = require('../dataBase/user');
const errorCodes = require('../constants/errorCodes.enum');
const errorMessage = require('../error/error.message');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            if (+userId < 0 || !Number.isInteger(+userId) || Number.isNaN(+userId)) {
                throw new Error(errorMessage.BAD_ID.en);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    checkIsUserValid: async (req, res, next) => {
        try {
            const { name, preferL = 'en' } = req.body;
            for (const user of User) {
                if (user.name === name) {
                    throw new Error(errorMessage.BAD_USER[preferL]);
                }
            }
            await next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
