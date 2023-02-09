const { Router } = require("express");
const ordersRoutes = Router();
const ordersController = require("../controllers/OrdersController");
const isAuthenticated = require("../middleware/isAuthenticated");

ordersRoutes.use(isAuthenticated);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.post("/", ordersController.create);

module.exports = ordersRoutes;
