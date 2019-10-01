module.exports = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_NAME: process.env.DB_NAME || "smsmessages",
  DB_PORT: process.env.DB_PORT || 27017,
  DB_USERNAME: process.env.DB_USER || "",
  DB_PASSWD: process.env.DB_PASSWD || ""
};
