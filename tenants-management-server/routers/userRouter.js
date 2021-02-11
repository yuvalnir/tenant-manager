const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const UserController = require('../controllers/userController.js')
const config = require('../config.properties')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, config.secretKey);

router.post('/user', UserController.createUser)
router.post('/login', UserController.userLogin)
protectedRouter.post('/logout', UserController.userLogout)

module.exports = router