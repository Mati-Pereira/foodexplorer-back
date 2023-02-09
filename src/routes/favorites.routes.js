const { Router } = require("express");
const favoritesRoutes = Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const favoritesController = require("../controllers/FavoritesController");

favoritesController.use(isAuthenticated);

favoritesController.get("/", favoritesController.show);
favoritesController.post("/", favoritesController.create);
favoritesController.put("/:id", favoritesController.update);

module.exports = favoritesRoutes;
