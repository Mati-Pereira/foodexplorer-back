const { Router } = require("express");
const userController = require("../controllers/UserController");

const userRoutes = Router();

userRoutes.get("/", userController.create);

module.exports = userRoutes;
