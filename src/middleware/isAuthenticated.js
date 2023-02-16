const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
	const authHeader = request.headers.authorization;
	console.log(authHeader);
	if (!authHeader) {
		throw new AppError("JWT token inválido");
	}

	const token = authHeader.split(" ")[1];
	try {
		const { sub: user_id } = verify(token, authConfig.jwt.secret);

		request.user = {
			id: Number(user_id),
		};

		return next();
	} catch (err) {
		throw new AppError(err.message, 401);
	}
}

module.exports = ensureAuthenticated;
