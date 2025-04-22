const Router = require('express');
const router = new Router();
const passwordController = require('../controller/password.controller');
const authorization = require('../middleware/authorization');
const roleAuthorization = require('../middleware/roleAuthorization');


router.post("/password/request-change",authorization, passwordController.requestChange);
router.get("/password/requests", authorization, roleAuthorization("admin"), passwordController.getRequests);
router.post("/password/approve/:id",authorization, roleAuthorization("admin"), passwordController.approveRequest);
router.post("/password/reject/:id",authorization,  roleAuthorization("admin"), passwordController.rejectRequest);
router.post("/password/change-self", authorization, roleAuthorization("admin"), passwordController.changeOwnPassword);



module.exports = router;
