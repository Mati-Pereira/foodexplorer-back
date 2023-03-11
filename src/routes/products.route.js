const { Router } = require("express");

const productsRoutes = Router();
const productsController = require("../controllers/ProductsController");

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.delete);

module.exports = productsRoutes;
