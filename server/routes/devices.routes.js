const Router = require('express');
const router = new Router();
const DevicesController = require('../controller/devices.controller');


router.get('/devices', DevicesController.getDevices)
router.patch('/devices/:id/delete', DevicesController.deleteDevice)
router.patch('/devices/:id', DevicesController.updateDevice)
router.post('/devices', DevicesController.createDevice);
router.get("/devices/by-type", DevicesController.getDevicesDistributionByType);
router.get("/devices/by-subdiv", DevicesController.getDevicesDistributionBySubdiv);
router.get("/devices/move", DevicesController.getMoveDevices);




module.exports = router;