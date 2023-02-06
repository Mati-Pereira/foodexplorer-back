const { Router } = require("express");
const router = Router();

const user = require("./userRoute");

router.use("/user", user);

module.exports = router;
