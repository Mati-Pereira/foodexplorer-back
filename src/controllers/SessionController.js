const knex = require("../knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
	async create(request, response) {
		const { email, password } = request.body;
		const user = await knex("users").where({ email }).first();
		if (!user) {
			throw new AppError("Email e/ou Senha estão inválidos");
		}
		const passwordMatched = await compare(password, user.password);
		if (!passwordMatched) {
			throw new AppError("Email e/ou Senha estão inválidos");
		}
		const { secret, expiresIn } = authConfig.jwt;
		const access_token = sign({}, secret, {
			subject: String(user.id),
			expiresIn,
		});
		return response.json({
			user: user.username,
			is_admin: user.is_admin,
			access_token,
		});
	}
}

module.exports = new SessionsController();
