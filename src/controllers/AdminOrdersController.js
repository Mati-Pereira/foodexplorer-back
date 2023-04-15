const knex = require("../knex");
const AppError = require("../utils/AppError");
const moment = require("moment-timezone");

class AdminOrdersController {
  async show(req, res) {
    const order = await knex("orders");
    return res.json(order);
  }
  async update(req, res) {
    const user = await knex("users").where({ id: req.user.id }).first();
    if (!user.is_admin) {
      throw new AppError("Usuário não é administrador", 400);
    }
    const { id } = req.params;
    const { status } = req.body;
    if (
      status !== "delivered" &&
      status !== "preparing" &&
      status !== "pending"
    ) {
      throw new AppError("Status inválido", 400);
    }
    await knex("orders")
      .where({ id })
      .update({
        status,
        updated_at: moment()
          .tz("America/Sao_Paulo")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
    return res.json({ message: "Pedido atualizado com sucesso" });
  }
}

module.exports = new AdminOrdersController();
