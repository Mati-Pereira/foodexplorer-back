const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function isAuthenticated(req, res, next) {
	const authHeader = req.headers["Authorization"];
	if (!authHeader) {
		throw new AppError("Usuário não autenticado");
	}
	const token = authHeader.split(" ")[1];
	try {
		const { sub: user_id } = verify(token, process.env.AUTH_SECRET);
		req.user.id = user_id;
		return next();
	} catch {
		throw new AppError("Token inválido");
	}
}

module.exports = isAuthenticated;
