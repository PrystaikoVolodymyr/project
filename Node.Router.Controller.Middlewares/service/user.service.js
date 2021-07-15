const DB = require('../dataBase/user');

module.exports = {
    getUsers: () => {
        return DB
    },
    getOneUser: (userId) => {
        return DB[userId]
    },
    addUser: (userObj) => {
        DB.push(userObj)
    },
    deleteUser: (userId) => {
        DB.splice(userId,1)
    }
}