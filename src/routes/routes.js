const express = require("express");
const router = express.Router();

const email = require("./email.route");
const authtoken = require("./authtoken.route");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome in my API" });
});

router.use("/email", email);
router.use("/auth-token", authtoken);

module.exports = router;
