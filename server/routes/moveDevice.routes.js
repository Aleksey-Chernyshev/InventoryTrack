const Router = require('express');
const router = new Router();
const MoveDeviceController = require('../controller/moveDevice.controller');


router.post('/moveDevice', MoveDeviceController.createMoveDevice)



module.exports = router;