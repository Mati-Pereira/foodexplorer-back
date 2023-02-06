require("dotenv/config");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`O Server está rodando na porta ${process.env.PORT}`);
});
