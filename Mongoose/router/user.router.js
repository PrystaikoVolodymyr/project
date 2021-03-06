const router = require('express').Router();
const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);
router.get('/:userId', userMiddleware.checkIsIdValid, userController.getOneUser);
// router.get('/:userId', userController.getOneUser);
router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteOneUser);
// router.delete('/:userId', userController.deleteOneUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);
// router.post('/', userController.createUser);

module.exports = router;
