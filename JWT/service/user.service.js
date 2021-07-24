const User = require('../dataBase/model/User');

module.exports = {
    findAllUsers: (userParams) => User.find(userParams),
    findUserById: (userId) => User.findById(userId),
    deleteUserById: (userId) => User.findByIdAndDelete(userId),
    createUser: async (user) => {
        await User.create(user);
    }
};
