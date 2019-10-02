const express = require("express");
const routes = express.Router();

const SystemController = require("./app/controllers/SystemController");
const MessageController = require("./app/controllers/MessageController");
const UserController = require("./app/controllers/UserController");
const guestMiddleware = require("./app/middlewares/Guest");
const authMiddleware = require("./app/middlewares/Auth");

routes.get("/", guestMiddleware, SystemController.index);
routes.get("/logout", SystemController.logout);
routes.post("/login", SystemController.login);
routes.post("/api/users", UserController.create);

routes.use(authMiddleware);

routes.get("/api/users", UserController.findAll);

routes.get("/api", MessageController.findAll);
routes.get("/api/messages", MessageController.findAll);
routes.get("/api/messages/:id", MessageController.find);
routes.post("/api/messages", MessageController.create);

routes.get("*", SystemController.notFound);

module.exports = routes;
