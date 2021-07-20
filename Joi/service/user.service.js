const User = require('../dataBase/model/User');

module.exports = {
    findAllUsers: (userParams) => User.find(userParams),
    findUserById: (userId) => User.findById(userId),
    addNewUser: async (user) => {
        await User.create(user);
    },
    deleteById: (userId) => User.findByIdAndDelete(userId)
};
