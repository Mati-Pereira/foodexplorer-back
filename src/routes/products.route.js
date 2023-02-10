const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);
const productsRoutes = Router();
const productsController = require("../controllers/ProductsController");

const isAuthenticated = require("../middleware/isAuthenticated");

productsRoutes.use(isAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post("/", upload.single("image"), productsController.create);
productsRoutes.put(
	"/:id",
	upload.single("image"),
	productsController.attributes,
);
productsRoutes.delete("/:id", productsController.delete);

module.exports = productsRoutes;
