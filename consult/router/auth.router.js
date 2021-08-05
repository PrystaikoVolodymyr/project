const router = require('express').Router();
const { authController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.post('/', userMiddleware.checkUserInDB, authController.authUser);
router.post('/refresh', authMiddleware.checkIsRefreshTokenValid, authController.refreshToken);

module.exports = router;
