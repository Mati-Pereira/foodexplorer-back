const knex = require("../knex");
const AppError = require("../utils/AppError");
const moment = require("moment-timezone");

class OrdersController {
	async index(req, res) {
		const user_id = req.user.id;
		const orders = await knex("orders").where({ user_id });
		return res.json(orders);
	}
	async create(req, res) {
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
	}
}

module.exports = new OrdersController();
