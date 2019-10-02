module.exports = {
  DB_HOST: process.env.MONGODB_HOST || "localhost",
  DB_PORT: process.env.MONGODB_PORT || 27017,
  DB_NAME: process.env.MONGODB_NAME || "smsmessages",
  DB_USERNAME: process.env.MONGODB_USER || "",
  DB_PASSWD: process.env.MONGODB_PASSWD || ""
};
