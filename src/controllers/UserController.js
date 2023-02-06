class UserController {
	async create(req, res) {
		return res.send("Voce atingiu a rota user");
	}
	async update(req, res) {
		return res.send("Voce atingiu a rota user");
	}
}

module.exports = new UserController();
