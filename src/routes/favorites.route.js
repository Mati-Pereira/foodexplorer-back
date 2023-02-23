const { Router } = require("express");
const favoritesRoutes = Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const favoritesController = require("../controllers/FavoritesController");

favoritesRoutes.get("/", isAuthenticated, favoritesController.show);
favoritesRoutes.post("/", isAuthenticated, favoritesController.create);
favoritesRoutes.put("/", isAuthenticated, favoritesController.update);

module.exports = favoritesRoutes;
