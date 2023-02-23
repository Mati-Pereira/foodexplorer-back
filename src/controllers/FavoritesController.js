const knex = require("../knex");

class FavoritesController {
	async create(req, res) {
		const user_id = req.user.id;
		const { favoriteList } = req.body;
		if (favoriteList) {
			await knex("favorites").insert({
				user_id,
				favoriteList,
			});
		}
		return res.json({
			message: "Lista de favoritos criada com sucesso!",
		});
	}
	async update(req, res) {
		const user_id = req.user.id;
		const { favoriteList } = req.body;
		if (favoriteList) {
			await knex("favorites").where({ user_id }).update({ favoriteList });
		}
		return res.json({
			message: "Lista de favoritos atualizada com sucesso!",
		});
	}
	async show(req, res) {
		const user_id = req.user.id;
		console.log("user_id", user_id);
		const favorites = await knex("favorites").where({ user_id }).first();
		console.log("favorites", favorites);
		return res.json(favorites);
	}
}

module.exports = new FavoritesController();
