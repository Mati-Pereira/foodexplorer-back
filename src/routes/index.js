const { Router } = require("express");

const user = require("./users.routes");
const sessions = require("./sessions.routes");

const router = Router();

router.use("/user", user);
router.use("/sessions", sessions);

module.exports = router;
