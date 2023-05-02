const { Router } = require("express");

const user = require("./users.route");
const sessions = require("./sessions.route");
const admin = require("./adm.orders.route");
const orders = require("./orders.route");
const products = require("./products.route");

const router = Router();

router.use("/users", user);
router.use("/sessions", sessions);
router.use("/adminOrders", admin);
router.use("/orders", orders);
router.use("/products", products);

module.exports = router;
