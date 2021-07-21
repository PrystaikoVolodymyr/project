const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.get('/:userId', userMiddleware.checkIsIdValid, userController.getOneUser);
router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

module.exports = router;
