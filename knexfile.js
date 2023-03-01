/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require("path");

module.exports = {
	client: "sqlite3",
	connection: {
		filename: "./database.db",
		timezone: "America/Sao_Paulo",
	},
	migrations: {
		directory: path.resolve(__dirname, "src", "knex", "migrations"),
		tableName: "knex_migrations",
	},
	seeds: {
		directory: path.resolve(__dirname, "src", "knex", "seeds"),
	},
	useNullAsDefault: true,
};
