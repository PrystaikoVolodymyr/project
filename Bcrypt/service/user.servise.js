const User = require('../dataBase/model/User');

module.exports = {
    findUsers: (userParams) => User.find(userParams),
    findUserById: (userId) => User.findById(userId),
    deleteById: (userId) => User.findByIdAndDelete(userId),
    addNewUser: async (user) => {
        await User.create(user);
    }
};
