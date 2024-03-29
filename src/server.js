require("dotenv/config");
require("express-async-errors");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/", express.static(uploadConfig.UPLOADS_FOLDER));

app.get("/", (request, response) => {
  return response.json({ message: "Server está rodando" });
});

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

app.listen(process.env.PORT, () => {
  console.log(`O server está rodando na porta ${process.env.PORT}`);
});
