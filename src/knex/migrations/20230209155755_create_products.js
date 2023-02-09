/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("products", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.string("description").notNullable();
		table.string("price").notNullable();
		table.string("image").notNullable();
		table.string("category").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("products");
};
