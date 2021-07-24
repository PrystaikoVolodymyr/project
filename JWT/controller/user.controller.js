const { userService } = require('../service');
const { statusCode } = require('../constants');
const { passwordHasher } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userParams = req.query;
            const users = await userService.findAllUsers(userParams);
            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name } = await userService.deleteUserById(userId);
            res.json(` User ${name} is delete`);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { password, name } = req.body;
            const hashPassword = await passwordHasher.hash(password);
            await userService.createUser({ ...req.body, password: hashPassword });
            res.json(` User ${name} is create`);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
