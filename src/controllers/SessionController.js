const knex = require("../knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await knex("users")
      .select("id", "username", "is_admin", "password")
      .where({ email })
      .first()
      .innerJoin("user_roles", "users.id", "user_roles.user_id")
      .where("user_roles.role_id", 1);
    if (!user) {
      throw new AppError("Email e/ou Senha estão inválidos", 401);
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Email e/ou Senha estão inválidos", 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const access_token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    return res.json({
      user: user.username,
      is_admin: user.is_admin,
      access_token,
    });
  }
}

module.exports = new SessionsController();
