const { Router } = require("express");

const user = require("./users.route");
const sessions = require("./sessions.route");
const admin = require("./adm.orders.route");
const favorites = require("./favorites.route");
const orders = require("./orders.route");
const products = require("./products.route");

const router = Router();

router.use("/user", user);
router.use("/sessions", sessions);
router.use("/adminOrders", admin);
router.use("/favorites", favorites);
router.use("/orders", orders);
router.use("/products", products);

module.exports = router;
