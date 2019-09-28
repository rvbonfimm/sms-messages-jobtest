const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./app/config/database");

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(
      `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
