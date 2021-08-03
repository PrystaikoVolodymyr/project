const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middlevare');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getOneUser);
router.delete('/:userId', authMiddleware.checkIsTokenValid, userController.deleteUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

module.exports = router;
