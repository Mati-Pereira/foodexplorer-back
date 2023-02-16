const knex = require("../knex");
const AppError = require("../utils/AppError");
const diskStorage = require("../providers/DiskStorage");

class ProductsController {
	async index(req, res) {
		try {
			const { name } = req.query;
			let products;
			if (name) {
				products = await knex("products")
					.where("name", "LIKE", `%${name}%`)
					.select("*");
			} else {
				products = await knex("products").select("*");
			}
			return res.json(products);
		} catch (err) {
			return res.json({ error: err.message });
		}
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

			const product_id = await knex("products").insert({
				name,
				price,
				description,
				category,
				image: filename,
			});

			const insertIngredients = ingredients.map((ingredient) => {
				return {
					name: ingredient,
					product_id,
				};
			});

			await knex("ingredients").insert(insertIngredients);

			return res.json({ message: "Produto cadastrado com sucesso!" });
		} catch (err) {
			return res.json({ error: err.message });
		}
	}
	async delete(req, res) {
		try {
			const { id } = req.params;
			const product = await knex("products").where("id", id).first();
			if (!product) {
				throw new AppError("Produto não encontrado.");
			}
			await knex("products").where("id", id).del();
			await knex("ingredients").where("product_id", id).del();
			return res.json({ message: "Produto removido com sucesso!" });
		} catch (err) {
			return res.json({ error: err.message });
		}
	}
	async show(req, res) {
		try {
			const { id } = req.params;
			const product = await knex("products").where({ id }).first();
			const ingredients = await knex("ingredients").where({ product_id: id });
			return res.json({
				...product,
				ingredients,
			});
		} catch (err) {
			return res.json({ error: err.message });
		}
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
			await knex("ingredients")
				.where({ product_id: id })
				.update(insertIngredients);
			return res.json({ message: "Produto atualizado com sucesso!" });
		} catch (err) {
			return res.json({ error: err.message });
		}
	}
}

module.exports = new ProductsController();
