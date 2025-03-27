const Router = require('express');
const router = new Router();
const roleAuthorization = require("../middleware/roleAuthorization");
const authorization = require("../middleware/authorization");
const UsersController = require('../controller/users.controller');


router.delete('/users/:id', authorization, roleAuthorization("admin"), UsersController.deleteUser)
router.put('/users/:id', authorization,roleAuthorization("admin"), UsersController.updateUser)



// Маршруты, доступные только админам
//router.get('/admin-dashboard', authorization, roleAuthorization("admin"), UserController.adminDashboard);

module.exports = router;
