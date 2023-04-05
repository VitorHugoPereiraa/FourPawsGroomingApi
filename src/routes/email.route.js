const express = require("express");
const sendEmailController = require("../controllers/sendEmail.controller");
const router = express.Router();

router.post("/sendEmail", sendEmailController.sendEmailCode);

module.exports = router;
