const mongoose = require("mongoose");

const connectMongooseDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@nodeapi.6ex8fna.mongodb.net/NodeAPI?retryWrites=true&w=majority`,
    (error) => {
      if (error) return console.error("Occoreu este erro");

      console.log("Servidor conectado");
    }
  );
};

module.exports = connectMongooseDatabase;
