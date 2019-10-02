const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dbConfig = require("./app/config/database");
const sessionConfig = require("./app/config/session");
const session = require("express-session");
const bodyParser = require("body-parser");
const LokiStore = require("connect-loki")(session);

const app = express();

mongoose.connect(
  `mongodb://${dbConfig.MONGODB_USER}:${dbConfig.MONGODB_PASSWD}@${dbConfig.MONGODB_HOST}:${dbConfig.MONGODB_PORT}/${dbConfig.MONGODB_NAME}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

app.use(bodyParser.json());

app.use(express.json());

app.use(
  session({
    name: sessionConfig.NAME,
    secret: sessionConfig.SECRET,
    expires: new Date(Date.now() + 3600000),
    resave: false,
    store: new LokiStore({
      path: path.resolve(__dirname, "sessions", "session.db")
    }),
    saveUninitialized: false
  })
);

app.use(require("./routes.js"));

module.exports = app;
