const Router = require('express');
const router = new Router();
const DepartmentsController = require('../controller/departments.controller');

router.get('/departments/bysubdiv/:id', DepartmentsController.getDepartmentsBySubdivision);

module.exports = router;
