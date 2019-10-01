const User = require("../models/User");

class UserController {
  async create(req, res) {
    const user = await User.create({
      name: "Tester",
      mail: "tester@alive.com"
    })
      .then(data => {
        if (data.length !== 0) {
          return res.json(data);
        }

        return res.json({ error: true, message: "User not added" });
      })
      .catch(error => {
        return res.json({ error: true, message: error });
      });
  }

  async findAll(req, res) {
    const users = await User.find({});

    return res.json({ users });
  }
}

module.exports = new UserController();
