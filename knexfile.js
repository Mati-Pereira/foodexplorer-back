/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db"),
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
