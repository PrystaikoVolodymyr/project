const User = require('../dataBase/model/User');
const { errorCodesEnum } = require('../constants');
const { errorMessage } = require('../error');
const { userValidator } = require('../validators');

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            if (userId.length !== 24) {
                throw new Error(errorMessage.BAD_ID);
            }
            await next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            const { email } = req.body;
            if (await User.findOne({ email })) {
                throw new Error(errorMessage.BAD_USER);
            }
            await next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
