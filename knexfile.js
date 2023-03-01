/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require("path");

module.exports = {
	client: "sqlite3",
	connection: {
		filename: "./database.db",
	},
	migrations: {
		directory: path.resolve(__dirname, "src", "knex", "migrations"),
		tableName: "knex_migrations",
	},
	seeds: {
		directory: path.resolve(__dirname, "src", "knex", "seeds"),
	},
	useNullAsDefault: true,
	pool: {
		afterCreate: (conn, done) => {
			conn.run('PRAGMA timezone = "America/Sao_Paulo";', (err) => {
				done(err, conn);
			});
		},
	},
};
