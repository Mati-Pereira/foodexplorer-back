require("dotenv/config");
require("express-async-errors");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/products", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(
	"/files",
	express.static(path.resolve(__dirname, "..", "tmp", "uploads")),
);
app.use(routes);

// Error handling class
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

app.listen(process.env.PORT, () => {
	console.log(`O server está rodando na porta ${process.env.PORT}`);
});
