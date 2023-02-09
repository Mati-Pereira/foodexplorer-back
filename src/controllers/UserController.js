const { hash } = require("bcryptjs");
const knex = require("../knex");
const AppError = require("../utils/AppError");

class UserController {
	async create(request, response) {
		const { name, email, password } = request.body;
		const checkUserExists = await knex("users").where({ email }).first();
		if (checkUserExists) {
			throw new AppError("E-mail já cadastrado, utilize outro e-mail.");
		}
		const hashPassword = await hash(password, 8);
		await knex("users").insert({ name, email, password: hashPassword });
		return response.status(201).json({
			status: "success",
			message: "Usuário criado com sucesso!",
		});
	}
}

module.exports = new UserController();
