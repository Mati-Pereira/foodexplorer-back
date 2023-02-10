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
			const image = req.file.filename;
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
			if (ingredients) {
				const insertIngredients = ingredients.map((ingredient) => {
					return {
						name: ingredient.name,
						product_id,
					};
				});
				await knex("ingredients").insert(insertIngredients);
			}
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
			const product = await knex("products").where("id", id).first();
			if (!product) {
				throw new AppError("Produto não encontrado.");
			}
			return res.json(product);
		} catch (err) {
			return res.json({ error: err.message });
		}
	}
	async attributes(req, res) {
		try {
			const data = req.body.data;
			const { name, price, description, type, ingredients } = JSON.parse(data);
			const { id } = req.params;
			const image = req.files.filename;
			if (!name || !price || !description || !type || !image) {
				throw new AppError("Não foi possivel realizar o cadastro.");
			}
			const filename = await diskStorage.saveFile(image);

			await knex("products").insert({
				name,
				price,
				description,
				type,
				image: filename,
			});

			if (ingredients) {
				await knex("ingredients").where({ product_id: id }).del();
				const insertIngredients = ingredients.map((ingredient) => {
					return {
						name: ingredient.name,
						product_id: id,
					};
				});
				await knex("ingredients").insert(insertIngredients);
			}
			return res.json({ message: "Produto atualizado com sucesso!" });
		} catch (err) {
			return res.json({ error: err.message });
		}
	}
}

module.exports = new ProductsController();
