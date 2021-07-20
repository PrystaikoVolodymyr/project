const userService = require('../service/user.service');
const User = require('../dataBase/model/User');
const errorCodes = require('../constants/errorCodes.enum');
const magicString = require('../constants/magicString.enum');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    getOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.getSingleUser(userId);
            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message());
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            await userService.addUser(user);
            res.json(magicString.CREATED_USER);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    deleteOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            await userService.deleteUser(userId);
            res.json(magicString.DELETED_USER(user.name));
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
