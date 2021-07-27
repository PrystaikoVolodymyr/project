const User = require('../dataBase/model/User');
const O_Auth = require('../dataBase/model/O_Auth');
const { passwordHasher } = require('../helpers');
const { tokenizer } = require('../helpers');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();
            await O_Auth.create({ ...tokens, user: user._id });

            res.json(tokens);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
