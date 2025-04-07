const Router = require('express');
const router = new Router();
const DevicesController = require('../controller/devices.controller');


router.get('/devices', DevicesController.getDevices)
router.patch('/devices/:id/delete', DevicesController.deleteDevice)
router.patch('/devices/:id', DevicesController.updateDevice)




module.exports = router;