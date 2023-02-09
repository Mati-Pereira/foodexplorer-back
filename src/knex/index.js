// let env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[process.env.NODE_ENV];
const knex = require("knex");

module.exports = knex;
