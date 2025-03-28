const Router = require('express');
const UserController = require('../controller/users.controller');
const router = new Router();
const authorization = require('../middleware/authorization');
const roleAuthorization = require("../middleware/roleAuthorization");

router.get('/', authorization, (req, res) => {
    res.json({ message: `Добро пожаловать, ${req.user.name}!`, user_name: req.user.name, role: req.user.role });
});
router.get('/users',authorization, roleAuthorization("admin"), UserController.getUsers)

// Админская панель (доступна только администраторам)
router.get('/admin', authorization, roleAuthorization("admin"), (req, res) => {
    res.json({ message: "Добро пожаловать в админскую панель!" });
});

module.exports = router;