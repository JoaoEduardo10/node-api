require("dotenv").config();
const mongoose = require("mongoose");
const connectMongooseDatabase = require("./dataBase/connectMongoDb");
const Person = require("./models/Person");

// configuração inicial
const express = require("express");
const app = express();

// foma de ler Json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas
const personRouter = require("./routes/personRouter");

app.use("/person", personRouter);

// porta de inicialização
const port = 8080;
connectMongooseDatabase();
app.listen(port, () => console.log(`Rodando express na porta ${port}`));
