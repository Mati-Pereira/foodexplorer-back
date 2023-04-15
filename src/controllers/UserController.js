const { hash } = require("bcryptjs");
const knex = require("../knex");
const AppError = require("../utils/AppError");

class UserController {
  async create(request, response) {
    try {
      const { username, email, password } = request.body;
      await knex.transaction(async (trx) => {
        const existingUser = await trx("users").where({ email }).first();
        if (existingUser) {
          throw new AppError("E-mail já cadastrado, utilize outro e-mail.");
        }
        const hashedPassword = await hash(password, 8);
        await trx("users").insert({
          username,
          email,
          password: hashedPassword,
        });
        await trx.commit();
      });
      return response.status(201).json({
        status: "success",
        message: "Usuário criado com sucesso!",
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
