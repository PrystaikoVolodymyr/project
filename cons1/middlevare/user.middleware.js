const User = require('../dataBase/model/User');
const { userValidator } = require('../validators');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            const { email } = req.body;
            if (await User.findOne({ email })) {
                throw new Error('User is already created');
            }
            await next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
