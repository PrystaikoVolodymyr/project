const { passwordHasher, tokenizer } = require('../helpers');
const { userService, authService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.findOneUser({ email }).select('+password');

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await authService.addToken({ ...tokens, user: user._id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { user, _id } = req.tokenInfo;
            const tokens = tokenizer();
            await authService.updateToken(_id, { ...tokens, user });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
