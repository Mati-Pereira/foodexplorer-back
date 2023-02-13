const knex = require("../knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

class SessionsController {
	async create(req, res) {
		const { email, password } = req.body;
		const user = await knex("users").where({ email }).first();
		if (!user) {
			throw new AppError("Email e/ou Senha estão inválidos", 401);
		}
		const passwordMatched = await compare(password, user.password);
		if (!passwordMatched) {
			throw new AppError("Email e/ou Senha estão inválidos", 401);
		}
		const access_token = sign({}, process.env.AUTH_SECRET, {
			subject: user.id,
			expiresIn: "1d",
		});
		return res.json({
			user: user.username,
			is_admin: user.is_admin,
			access_token,
		});
	}
}

module.exports = new SessionsController();
