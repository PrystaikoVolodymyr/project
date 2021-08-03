const router = require('express').Router();
const { authController } = require('../controller');

router.get('/', authController.getAllTokens);
router.post('/', authController.authUser);

module.exports = router;
