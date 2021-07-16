const router = require('express').Router();
const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);
router.get('/:userId', userMiddleware.checkIsIdValid, userController.getOneUser);
router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteOneUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

module.exports = router;
