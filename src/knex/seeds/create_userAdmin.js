const { hash } = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	await knex("users").del();
	await knex("users").insert([
		{
			username: "admin",
			email: "admin@email.com",
			password: await hash("123456789", 8),
			is_admin: true,
		},
	]);
};
