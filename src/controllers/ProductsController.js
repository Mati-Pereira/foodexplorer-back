const knex = require("../knex");
const AppError = require("../utils/AppError");
const diskStorage = require("../providers/DiskStorage");

class ProductsController {
  async index(req, res) {
    const { name } = req.query;
    let products;
    if (name) {
      products = await knex("ingredients")
        .select("products.*")
        .join("products", "ingredients.product_id", "=", "products.id")
        .where("ingredients.name", "LIKE", `%${name}%`)
        .orWhere("products.name", "LIKE", `%${name}%`)
        .distinct("products.id");
    } else {
      products = await knex("products");
    }

    return res.json(products);
  }

  async create(req, res) {
    try {
      const data = req.body.data;
      const { name, price, description, ingredients, category } =
        JSON.parse(data);
      const image = req.file?.filename;
      if (!image) {
        throw new AppError("Arquivo de imagem não foi enviado corretamente.");
      }
      if (!name || !price || !description || !ingredients || !category) {
        throw new AppError("Não foi possivel realizar o cadastro.");
      }
      const filename = await diskStorage.saveFile(image);
      await knex.transaction(async (trx) => {
        const [insertedProductId] = await trx("products")
          .insert({ name, price, description, category, image: filename })
          .returning("id");
        const insertIngredients = ingredients.map((ingredient) => {
          return { name: ingredient, product_id: insertedProductId };
        });
        await trx("ingredients").insert(insertIngredients);
        await trx("products")
          .where({ id: insertedProductId })
          .update({ image: filename });
        return [insertedProductId];
      });
      return res.json({ message: "Produto cadastrado com sucesso!" });
    } catch (e) {
      throw new AppError(e.message);
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    const product = await knex("products").select("id").where("id", id).first();
    if (!product) {
      throw new AppError("Produto não encontrado.");
    }
    await knex.transaction(async (trx) => {
      await trx("ingredients").where("product_id", id).del();
      await trx("products").where("id", id).del();
    });
    return res.json({ message: "Produto removido com sucesso!" });
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await knex("products").where({ id }).first();
    const ingredients = await knex("ingredients").where({ product_id: id });
    return res.json({
      ...product,
      ingredients,
    });
  }
  async update(req, res) {
    try {
      const data = req.body.data;
      const { name, price, description, category, ingredients } =
        JSON.parse(data);
      const stringImage = typeof req.body.image;
      const { id } = req.params;

      if (!name || !price || !description || !category) {
        throw new AppError("Não foi possivel realizar o cadastro.");
      }

      if (!(stringImage === "string")) {
        const image = req.file?.filename;
        const filename = await diskStorage.saveFile(image);
        await knex("products").where({ id }).update({
          name,
          price,
          description,
          category,
          image: filename,
        });
      } else {
        await knex("products").where({ id }).update({
          name,
          price,
          description,
          category,
        });
      }
      const insertIngredients = ingredients.map((ingredient) => {
        return {
          name: ingredient,
          product_id: id,
        };
      });
      await knex("ingredients").where({ product_id: id }).del();
      await knex("ingredients")
        .where({ product_id: id })
        .insert(insertIngredients);
      return res.json({ message: "Produto atualizado com sucesso!" });
    } catch (e) {
      throw new AppError(e.message);
    }
  }
}

module.exports = new ProductsController();
