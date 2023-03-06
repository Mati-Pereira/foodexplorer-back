/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require("path");
require("dotenv/config");

module.exports = {
	client: "pg",
	connection: process.env.DATABASE_URL,
	migrations: {
		directory: path.resolve(__dirname, "src", "knex", "migrations"),
		tableName: "knex_migrations",
	},
	seeds: {
		directory: path.resolve(__dirname, "src", "knex", "seeds"),
	},
	useNullAsDefault: true,
};
