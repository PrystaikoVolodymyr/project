const { userValidator } = require('../validators');
const { errorMessage } = require('../error');
const { statusCodesEnum } = require('../constants');
const ErrorHandler = require('../error/ErrorHandler');
const User = require('../dataBase/model/User');

const checkUserInDB = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.NO_USER);
        }
        await next();
    } catch (e) {
        next(e);
    }
};

const checkIsUserValid = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { error } = userValidator.createUserValidator.validate(req.body);
        if (error) {
            throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.NOT_VALID_USER, error.details[0].message);
        }
        if (await User.findOne({ email })) {
            throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage.EMAIL_ALREADY_USED);
        }
        await next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    checkIsUserValid,
    checkUserInDB
};
