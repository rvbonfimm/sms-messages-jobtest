const User = require("../models/User");

class SystemController {
  index(req, res) {
    return res.render("index.njk");
  }

  dashboard(req, res) {
    return res.render("dashboard.njk");
  }

  notFound(req, res) {
    return res.json({ message: "Route not found" });
  }

  async login(req, res) {
    const { mail } = req.body;

    try {
      const user = await User.findOne({ mail });

      if (user.length === 0) {
        return res.status(404).json({ error: true, message: "Mail not found" });
      }

      req.session.user = user;

      return res.status(200).redirect("/api");
    } catch (error) {
      return res.status(404).json({ error: true, message: error });
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.clearCookie("sms-messages");
      return res.redirect("/");
    });
  }
}

module.exports = new SystemController();
