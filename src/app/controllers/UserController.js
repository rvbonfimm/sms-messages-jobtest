const User = require("../models/User");

class UserController {
  async findAll(req, res) {
    const users = await User.find().then(data => {
      return res.status(201).json(data);
    });
  }

  async find(req, res) {
    const user = await User.find({ _id: req.params.id }).then(data => {
      if (data.length === 0) {
        return res.status(404).send();
      }

      return res.status(200).send(data);
    });
  }

  async create(req, res) {
    const user = await User.create(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(error => {
        res.status(422).send({ message: error.message });
      });
  }
}

module.exports = new UserController();
