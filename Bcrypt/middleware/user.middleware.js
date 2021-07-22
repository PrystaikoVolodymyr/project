const { userValidator } = require('../validators');
const { errorMessage } = require('../error');
const User = require('../dataBase/model/User');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { error } = userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            if (await User.findOne({ email })) {
                throw new Error(errorMessage.BAD_USER(email));
            }
            await next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
