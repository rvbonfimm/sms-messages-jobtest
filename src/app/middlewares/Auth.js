module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else if (req.session && !req.session.user) {
    return res.json({ error: true, message: "User not authenticated" });
  }
};
