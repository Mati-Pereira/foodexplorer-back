const knex = require("../knex");

class FavoritesController {
	async create(req, res) {
		const user_id = req.user.id;
		const { name } = req.body;
		const newFavorite = await knex("favorites").insert({
			user_id,
			name,
		});
		return res.json(newFavorite);
	}
}

module.exports = new FavoritesController();
