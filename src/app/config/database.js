module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
  MONGODB_USER: process.env.MONGODB_USER || "",
  MONGODB_PASSWD: process.env.MONGODB_PASSWD || "",
  MONGODB_NAME: process.env.MONGODB_NAME || "smsmessages"
};
