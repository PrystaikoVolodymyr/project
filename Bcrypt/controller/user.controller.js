const { userService } = require('../service');
const { statusCodesEnum, magicStringsEnum } = require('../constants');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userOptions = req.query;
            const user = await userService.findUsers(userOptions);
            res.json(user);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);
            await userService.deleteById(userId);
            res.json(magicStringsEnum.DELETED_USER(user.name));
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            await userService.addNewUser(user);
            res.json(magicStringsEnum.CREATED_USER(user.name));
        } catch (e) {
            res.status(statusCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
