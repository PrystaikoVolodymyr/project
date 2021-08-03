const User = require('../dataBase/model/User');

module.exports = {
    findAllUsers: (queryParams) => User.find(queryParams),
    findUserById: (userId) => User.findById(userId),
    deleteById: (userId) => User.findByIdAndDelete(userId),
    createUser: async (user) => {
        await User.create(user);
    }
};
