const { userService } = require('../service');
const { errorCodesEnum, magicStringsEnum } = require('../constants');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userParams = req.query;
            const users = await userService.findAllUsers(userParams);
            res.json(users);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    getOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            await userService.addNewUser(user);
            res.json(magicStringsEnum.CREATED_USER);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            await userService.deleteById(userId);
            res.json(magicStringsEnum.DELETED_USER);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
