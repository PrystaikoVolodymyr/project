const User = require('../dataBase/model/User');
const { userValidator } = require('../validators');
const { errorMessage } = require('../error');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            const { email } = req.body;
            if (await User.findOne({ email })) {
                throw new Error(errorMessage.BAD_USER);
            }
            await next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
