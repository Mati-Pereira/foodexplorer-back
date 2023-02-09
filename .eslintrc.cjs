module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
		jest: true,
	},
	extends: ["eslint:recommended", "eslint-config-prettier"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
	},
	plugins: ["prettier"],
	rules: {},
};
