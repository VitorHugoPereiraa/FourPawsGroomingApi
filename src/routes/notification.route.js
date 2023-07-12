const express = require("express");
const notificationController = require("../controllers/notification.controller");
const router = express.Router();

router.post("/sendNotification", notificationController.sendNotification);

module.exports = router;
