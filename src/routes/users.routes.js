const { Router } = require("express");
const userController = require("../controllers/UserController");

const userRoutes = Router();

userRoutes.post("/", userController.create);

module.exports = userRoutes;
