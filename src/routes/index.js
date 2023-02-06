const { Router } = require("express");

const user = require("./userRoute");

const router = Router();

router.use("/user", user);

module.exports = router;
