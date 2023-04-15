const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT token inválido");
  }
  const [, access_token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(access_token, authConfig.jwt.secret);
    request.user = {
      id: Number(user_id),
    };
    return next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}
module.exports = ensureAuthenticated;
