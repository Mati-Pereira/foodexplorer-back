/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("favorites", (table) => {
		table.increments("id").primary();
		table.string("favoriteList");
		table.integer("user_id").notNullable();
		table.foreign("user_id").references("id").inTable("users");
		table.integer("product_id").notNullable();
		table.foreign("product_id").references("id").inTable("products");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("favorites");
};
