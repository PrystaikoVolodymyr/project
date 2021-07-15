const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getUsers()
            res.json(users)
        }catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const {userId} = req.params
            const user = await userService.getOneUser(userId)
            res.json(user)
        }catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
           await userService.addUser(user)
            res.json('User is created')
        }catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    },
    deleteOneUser: async (req, res) => {
        try {
            const {userId} = req.params;
            await userService.deleteUser(userId)
            res.json('User is delete')
        }catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    }
}