const { Router } = require("express");

const adminOrdersRoutes = Router();
const adminOrdersController = require("../controllers/AdminOrdersController");
const isAuthenticated = require("../middleware/isAuthenticated");

adminOrdersRoutes.use(isAuthenticated);

adminOrdersRoutes.get("/", adminOrdersController.show);
adminOrdersRoutes.put("/", adminOrdersController.update);

module.exports = adminOrdersRoutes;
