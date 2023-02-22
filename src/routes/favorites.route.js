const { Router } = require("express");
const favoritesRoutes = Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const favoritesController = require("../controllers/FavoritesController");

favoritesRoutes.use(isAuthenticated);

favoritesRoutes.get("/", favoritesController.show);
favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.put("/:id", favoritesController.update);
favoritesRoutes.delete("/", favoritesController.delete);

module.exports = favoritesRoutes;
