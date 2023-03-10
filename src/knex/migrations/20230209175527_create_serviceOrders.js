/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("orders", (table) => {
		table.increments("id").primary();
		table.string("status").defaultTo("pending");
		table.string("description");
		table.timestamps(true, true);
		table.integer("user_id").notNullable();
		table
			.foreign("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("orders");
};
