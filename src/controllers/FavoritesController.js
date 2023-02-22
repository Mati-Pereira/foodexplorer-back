const knex = require("../knex");

class FavoritesController {
	async create(req, res) {
		const user_id = req.user.id;
		const { favoriteList } = req.body;
		await knex("favorites").insert({
			user_id,
			favoriteList,
		});
		return res.json({
			message: "Lista de favoritos criada com sucesso!",
		});
	}
	async update(req, res) {
		const user_id = req.user.id;
		const { favoriteList } = req.body;
		if (favoriteList) {
			await knex("favorites").where({ user_id }).update({
				favoriteList,
				updated_at: knex.fn.now(),
			});
		}
		return res.json({
			message: "Lista de favoritos atualizada com sucesso!",
		});
	}
	async show(req, res) {
		const user_id = req.user.id;
		const favorites = await knex("favorites").where({ user_id });
		return res.json(favorites);
	}
	async delete(req, res) {
		const user_id = req.user.id;
		await knex("favorites").where({ user_id }).del();
		return res.json({
			message: "Lista de favoritos deletada com sucesso!",
		});
	}
}

module.exports = new FavoritesController();
