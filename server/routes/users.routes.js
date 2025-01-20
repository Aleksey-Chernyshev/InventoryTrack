const Router = require('express')
const router = new Router()
const UserController = require('../controller/users.controller')
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

router.post('/register', validInfo, UserController.createUser)
router.post('/login', validInfo, UserController.loginUser)
router.get('/is-verify', authorization, UserController.isVerifyUser)


module.exports = router