const { verify } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

function isAuthenticated(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new AppError("Usuário não autenticado");
	}
	const token = authHeader.split(" ")[1];
	try {
		const { sub: user_id } = verify(token, authConfig.jwt.secret);
		req.user = { id: Number(user_id) };
		return next();
	} catch {
		throw new AppError("Token inválido");
	}
}

module.exports = isAuthenticated;
