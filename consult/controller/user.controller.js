const { userService, authService } = require('../service');
const { passwordHasher } = require('../helpers');
const { errorMessage } = require('../error');
const ErrorHandler = require('../error/ErrorHandler');
const { statusCodesEnum, magicStringsEnum } = require('../constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const userOptions = req.query;
            const user = await userService.findUsers(userOptions);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { user, _id } = req.tokenInfo;
            if (userId !== user._id.toString()) {
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessage.NOT_VALID_USER);
            }
            const deletedUser = await userService.deleteById(userId);
            await authService.deleteToken(_id);

            res.json(magicStringsEnum.DELETED_USER(deletedUser.name));
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { password, name } = req.body;
            const hashPassword = await passwordHasher.hash(password);
            await userService.addNewUser({ ...req.body, password: hashPassword });

            res.json(magicStringsEnum.CREATED_USER(name));
        } catch (e) {
            next(e);
        }
    }
};
