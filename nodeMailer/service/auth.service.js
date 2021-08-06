const O_Auth = require('../dataBase/model/O_Auth');

module.exports = {
    addToken: async (tokens) => {
        await O_Auth.create(tokens);
    },
    updateToken: async (tokenId, updateObject) => {
        await O_Auth.findByIdAndUpdate(tokenId, updateObject);
    },
    findToken: (token) => O_Auth.findOne(token),
    deleteToken: (tokenId) => O_Auth.findByIdAndDelete(tokenId)
};
