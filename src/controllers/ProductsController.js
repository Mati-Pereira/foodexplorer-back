const knex = require("../knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ProductsController {
	async index(req, res) {
		try {
			const { name } = req.query;
			let products;
			if (name) {
				products = await knex("products").where("name", "LIKE", `%${name}%`);
			} else {
				products = await knex("products");
			}
			return res.json(products);
		} catch (e) {
			throw new AppError(e.message, 500);
		}
	}
	async create(req, res) {
		try {
			const data = req.body.data;
			const { name, price, description, ingredients, category } =
				JSON.parse(data);
			const diskStorage = new DiskStorage();

			const img = req.file.filename;

			if (!img) {
				throw new AppError("Arquivo de imagem não foi enviado corretamente.");
			}

			const filename = await diskStorage.saveFile(img);

			if (!name || !price || !description || !img || !category) {
				throw new AppError("Não foi possivel realizar o cadastro.");
			}

			const [productId] = await knex("products")
				.insert({
					name,
					price,
					description,
					category,
					image: filename,
				})
				.returning("id");
			const insertIngredients = ingredients.map((ingredient) => {
				return {
					name: ingredient,
					product_id: productId.id,
				};
			});
			await knex("ingredients").insert(insertIngredients);
			return res.json({ message: "Produto cadastrado com sucesso!" });
		} catch (e) {
			console.log(e);
			throw new AppError(e.message, 500);
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
		} catch (e) {
			throw new AppError(e.message, 500);
		}
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
			const { id } = req.params;
			const diskStorage = new DiskStorage();
			const img = req.file.filename;

			if (!name || !price || !description || !category) {
				throw new AppError("Não foi possivel realizar o cadastro.");
			}

			if (img) {
				const filename = await diskStorage.saveFile(img);
				await knex("products").where({ id }).update({
					name,
					price,
					description,
					img: filename,
					category,
				});
			} else {
				const productUpdate = {
					name,
					price,
					description,
					category,
				};
				await knex("products").where({ id }).update(productUpdate);
			}

			const insertIngredients = ingredients.map((ingredient) => {
				return {
					name: ingredient,
					product_id: id,
				};
			});
			await knex("ingredients").where({ product_id: id }).del();
			await knex("ingredients").insert(insertIngredients);
			return res.json({ message: "Produto atualizado com sucesso!" });
		} catch (e) {
			throw new AppError(e.message, 500);
		}
	}
}

module.exports = new ProductsController();
