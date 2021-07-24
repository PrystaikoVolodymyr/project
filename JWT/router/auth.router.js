const router = require('express').Router();
const { passwordHasher } = require('../helpers');
const User = require('../dataBase/model/User');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        await passwordHasher.compare(password, user.password);
        res.json(user);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

module.exports = router;
