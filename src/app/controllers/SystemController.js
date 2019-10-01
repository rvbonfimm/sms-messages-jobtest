const User = require("../models/User");

class SystemController {
  index(req, res) {
    return res.json({ message: "Need to login the user" });
  }

  notFound(req, res) {
    return res.json({ message: "Route not found" });
  }

  async login(req, res) {
    const { mail } = req.body;

    try {
      const user = await User.find({ mail });

      if (user.length === 0) {
        return res.json({ error: true, message: "Mail not found" });
      }

      req.session.user = user;

      return res.json({ message: "User logged" });
    } catch (error) {
      return res.status(404).json({ error: true, message: error });
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie("sms-messages");
      return res.json({ message: "User session cleared" });
    });
  }
}

module.exports = new SystemController();
