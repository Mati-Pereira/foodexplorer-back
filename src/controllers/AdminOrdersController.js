const knex = require("../knex");
const AppError = require("../utils/AppError");
const moment = require("moment-timezone");

class AdminOrdersController {
	async show(req, res) {
		const order = await knex("orders");
		return res.json(order);
	}
	async update(req, res) {
		const user_id = req.user.id;
		const { id } = req.params;
		const { status } = req.body;
		const user = await knex("users").where({ id: user_id }).first();
		const is_admin = Boolean(user.is_admin);
		if (is_admin) {
			if (
				status === "delivered" ||
				status === "preparing" ||
				status === "pending"
			) {
				await knex("orders")
					.where({ id })
					.update({
						status,
						updated_at: moment()
							.tz("America/Sao_Paulo")
							.format("YYYY-MM-DD HH:mm:ss"),
					});
			} else {
				throw new AppError("Status inválido", 400);
			}
		} else {
			throw new AppError("Usuário não é administrador", 400);
		}
		return res.json({ message: "Pedido atualizado com sucesso" });
	}
}

module.exports = new AdminOrdersController();
