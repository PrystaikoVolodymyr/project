const User = require('../dataBase/model/User');
const O_Auth = require('../dataBase/model/O_Auth');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    getAllTokens: async (req, res) => {
        try {
            const tokens = await O_Auth.find();
            res.json(tokens);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            await passwordHasher.compare(password, user.password);
            const token = tokenizer();
            await O_Auth.create({ ...token, user: user._id });
            res.json(token);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
