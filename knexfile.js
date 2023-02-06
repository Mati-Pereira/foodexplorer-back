/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "knex", "migrations"),
      tableName: "knex_migrations",
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "knex", "seeds"),
    },
    useNullAsDefault: true,
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
