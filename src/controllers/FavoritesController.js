const knex = require("../knex");
const AppError = require("../utils/AppError");

class FavoritesController {
	async create(req, res) {
		try {
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
		} catch (e) {
			throw new AppError(e.message, 400);
		}
	}
	async update(req, res) {
		try {
			const user_id = req.user.id;
			const { favoriteList } = req.body;
			if (favoriteList) {
				await knex("favorites").where({ user_id }).update({ favoriteList });
			}
			return res.json({
				message: "Lista de favoritos atualizada com sucesso!",
			});
		} catch (e) {
			throw new AppError(e.message, 400);
		}
	}
	async show(req, res) {
		try {
			const user_id = req.user.id;
			const favorites = await knex("favorites").where({ user_id }).first();
			return res.json(favorites);
		} catch (e) {
			throw new AppError(e.message, 400);
		}
	}
}

module.exports = new FavoritesController();
