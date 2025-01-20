const Router = require('express')
const router = new Router()
const authorization = require('../middleware/authorization')
const DashboardController = require("../controller/dashboard.controller")

router.get("/", authorization, DashboardController.dashboard)

module.exports = router