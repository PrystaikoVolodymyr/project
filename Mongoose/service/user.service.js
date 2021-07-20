const User = require('../dataBase/model/User');

module.exports = {
    getUsers: () => User.find(),
    getSingleUser: (userId) => User.findById(userId),
    addUser: async (user) => {
        await User.create(user);
    },
    deleteUser: async (userId) => {
        await User.findByIdAndDelete(userId);
    }
};
