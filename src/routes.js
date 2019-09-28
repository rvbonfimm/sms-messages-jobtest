const routes = require("express").Router();

const MessageController = require("./app/controllers/MessageController");
const UserController = require("./app/controllers/UserController");

routes.get("/app/users", UserController.findAll);
routes.get("/app/users/:id", UserController.find);
routes.post("/app/users", UserController.create);

routes.get("/app/messages", MessageController.findAll);
routes.get("/app/messages/:id", MessageController.find);
routes.post("/app/messages", MessageController.create);

routes.post("/app/messages/encode", MessageController.encoder);
routes.post("/app/messages/decode", MessageController.decoder);

module.exports = routes;
