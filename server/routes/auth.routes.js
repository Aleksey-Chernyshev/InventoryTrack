const Router = require('express');
const router = new Router();
const UserController = require('../controller/users.controller');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const roleAuthorization = require("../middleware/roleAuthorization"); // Проверка роли

router.get('/profile', authorization, UserController.getUserProfile);
router.post('/register', validInfo, UserController.createUser);
router.post('/login', validInfo, UserController.loginUser);
router.get('/is-verify', authorization, UserController.isVerifyUser);




// Маршруты, доступные только админам
//router.get('/admin-dashboard', authorization, roleAuthorization("admin"), UserController.adminDashboard);

module.exports = router;
