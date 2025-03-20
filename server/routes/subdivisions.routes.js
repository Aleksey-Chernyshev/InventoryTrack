const Router = require('express');
const router = new Router();
const SubdivisionsController = require('../controller/subdivisions.controller');


router.get('/subdivisions', SubdivisionsController.getSubdivisions)



module.exports = router;