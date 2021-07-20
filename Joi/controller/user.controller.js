const userService = require('../service/user.service');
const errorCodes = require('../constants/errorCodes.enum');
const magicString = require('../constants/magicStrings.enum');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userParams = req.query;
            const users = await userService.findAllUsers(userParams);
            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    getOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            await userService.addNewUser(user);
            res.json(magicString.CREATED_USER);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            await userService.deleteById(userId);
            res.json(magicString.DELETED_USER);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
