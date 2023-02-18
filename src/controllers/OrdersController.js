const knex = require("../knex");
const AppError = require("../utils/AppError");

class OrdersController {
	async index(req, res) {
		const user_id = req.user.id;
		const orders = await knex("orders").where({ user_id });
		return res.json(orders);
	}
	async create(req, res) {
		const user_id = req.user.id;
		const { status, description } = req.body;
		if (!status || !description) {
			throw new AppError("Preencha todos os campos", 400);
		}
		await knex("orders").insert({
			status,
			description,
			user_id,
		});
		return res.json({ message: "Pedido criado com sucesso" });
	}
}

module.exports = new OrdersController();
