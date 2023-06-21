const express = require("express");
const authTokenController = require("../controllers/authToken.controller");
const router = express.Router();

router.post("/generateToken", authTokenController.generateJWT);
router.post("/validateToken", authTokenController.validateJWT);

module.exports = router;
