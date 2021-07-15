const router = require('express').Router()
const userRouter = require('./user.router');

router.use('/users', userRouter)

module.exports = router