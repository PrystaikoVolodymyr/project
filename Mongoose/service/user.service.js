const User = require('../dataBase/user');

module.exports = {
    getUsers: () => User,
    getSingleUser: (userId) => User[userId],
    addUser: (user) => {
        User.push(user);
    },
    deleteUser: (userId) => {
        User.splice(userId, 1);
    }
};
