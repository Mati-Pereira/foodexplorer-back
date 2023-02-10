const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = multer(uploadConfig.MULTER);
const productsRoutes = Router();
const productsController = require("../controllers/ProductsController");

productsRoutes.use(isAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.patch(
	"/image",
	upload.single("image"),
	productsController.create,
);
productsRoutes.put(
	"/image/:id",
	upload.single("image"),
	productsController.attributes,
);
productsRoutes.delete("/:id", productsController.delete);

module.exports = productsRoutes;
