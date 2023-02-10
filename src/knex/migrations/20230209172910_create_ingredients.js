/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("ingredients", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.integer("product_id").notNullable();
		table.foreign("product_id").references("id").inTable("products");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("ingredients");
};
