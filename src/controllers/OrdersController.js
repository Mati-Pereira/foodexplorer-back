const knex = require("../knex");
const AppError = require("../utils/AppError");
const moment = require("moment-timezone");

class OrdersController {
	async index(req, res) {
		try {
			const user_id = req.user.id;
			const orders = await knex("orders").where({ user_id });
			return res.json(orders);
		} catch (e) {
			throw new AppError(e.message, 400);
		}
	}
	async create(req, res) {
		try {
			const user_id = req.user.id;
			const { description } = req.body;
			if (!description) {
				throw new AppError("Preencha todos os campos", 400);
			}
			await knex("orders").insert({
				description,
				user_id,
				created_at: moment()
					.tz("America/Sao_Paulo")
					.format("YYYY-MM-DD HH:mm:ss"),
				updated_at: moment()
					.tz("America/Sao_Paulo")
					.format("YYYY-MM-DD HH:mm:ss"),
			});
			return res.json({ message: "Pedido criado com sucesso" });
		} catch (e) {
			throw new AppError(e.message, 400);
		}
	}
}

module.exports = new OrdersController();
