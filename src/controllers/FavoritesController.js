const knex = require("../knex");

class FavoritesController {
  async create(req, res) {
    const { id } = req.user;
    const { favoriteList } = req.body;
    if (!favoriteList) {
      return res.status(400).json({
        message: "Missing required field 'favoriteList'",
      });
    }
    await knex("favorites").insert({
      user_id: id,
      favoriteList,
    });
    return res.json({
      message: "Lista de favoritos criada com sucesso!",
    });
  }
  async update(req, res) {
    const user_id = req.user.id;
    const { favoriteList } = req.body;
    if (!favoriteList) {
      return res
        .status(400)
        .json({ message: "Lista de favoritos não enviada." });
    }
    await knex.transaction(async (trx) => {
      const rows = await trx("favorites").where({ user_id }).select("id");
      if (rows.length) {
        await trx("favorites").where({ user_id }).update({ favoriteList });
      } else {
        await trx("favorites").insert({ user_id, favoriteList });
      }
    });
    return res.json({ message: "Lista de favoritos atualizada com sucesso!" });
  }
  async show(req, res) {
    const user_id = req.user.id;
    const favorites = await knex("favorites").where({ user_id });
    return res.json(favorites);
  }
}

module.exports = new FavoritesController();
