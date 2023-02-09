const { hash } = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("users").del();
	await knex("users").insert([
		{
			name: "admin",
			email: "admin@email.com",
			password: await hash("112233", 8),
			is_admin: true,
		},
	]);
};
