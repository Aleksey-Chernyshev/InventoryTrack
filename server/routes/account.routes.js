const Router = require('express');
const router = new Router();
const authorization = require('../middleware/authorization');
const roleAuthorization = require('../middleware/roleAuthorization');
const accountController = require('../controller/account.controller');


router.post("/account/delete-request", authorization, accountController.requestDelete);
router.get("/account/delete-requests", authorization, roleAuthorization("admin"), accountController.getDeleteRequests);
router.post("/account/delete-approve/:id", authorization, roleAuthorization("admin"), accountController.approveDelete);
router.post("/account/delete-reject/:id", authorization, roleAuthorization("admin"), accountController.rejectDelete);
router.delete("/account/delete-self", authorization, roleAuthorization("admin"), accountController.deleteOwnAccount);

module.exports = router;