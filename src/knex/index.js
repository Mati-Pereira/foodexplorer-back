// let env = process.env.NODE_ENV || "development";
const config = require("../../knexfile");
const knex = require("knex")(config.development);

console.log(config);

module.exports = knex;
