require("dotenv/config");
require("express-async-errors");
const cors = require("cors");
const AppError = require("./utils/AppError");
const express = require("express");
const uploadConfig = require("./configs/upload");
const routes = require("./routes");

const app = express();

app.use(cors());

app.use("/", express.static(uploadConfig.UPLOAD_FOLDER));

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
	}
	return response.status(500).json({
		status: "error",
		message: "Erro interno do servidor",
	});
});

app.listen(3000, () => {
	console.log(`O server está rodando na porta 3000`);
});
