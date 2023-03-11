module.exports = {
	apps: [
		{
			name: "app",
			script: "./src/server.js",
			ignore_watch: ["node_modules"],
			watch: true,
			max_memory_restart: "1G",
			instances: "max",
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
