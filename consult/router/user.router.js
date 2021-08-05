const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', authMiddleware.checkIsTokenValid, userController.deleteUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

module.exports = router;
