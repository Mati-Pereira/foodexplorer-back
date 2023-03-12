const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const productsController = require("../controllers/ProductsController");

const upload = multer(uploadConfig.MULTER);

const productsRoutes = Router();

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post("/", upload.single("image"), productsController.create);
productsRoutes.put("/:id", upload.single("image"), productsController.update);
productsRoutes.delete("/:id", productsController.delete);

module.exports = productsRoutes;
