const { statusCode } = require('../constant');
const { userService } = require('../service');
const { passwordHasher } = require('../helpers');
const O_Auth = require('../dataBase/model/O_Auth');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const queryParams = req.query;
            const users = await userService.findAllUsers(queryParams);

            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    getOneUser: async (req, res) => {
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
            const { user, _id } = req.tokens;
            if (userId !== user._id.toString()) {
                throw new Error('Unauthorized');
            }
            const deletedUser = await userService.deleteById(userId);
            await O_Auth.findByIdAndDelete(_id);
            res.json(`User ${deletedUser.name} is deleted`);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordHasher.hash(password);
            await userService.createUser({ ...req.body, password: hashPassword });
            res.json(`User ${req.body.name} is created`);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
