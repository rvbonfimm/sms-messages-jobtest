const { MongoClient } = require("mongodb");
const dbConfig = require("../../src/app/config/database");

describe("database connection", () => {
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      `mongodb://${dbConfig.MONGODB_USER}:${dbConfig.MONGODB_PASSWD}@${dbConfig.MONGODB_HOST}:${dbConfig.MONGODB_PORT}/${dbConfig.MONGODB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    db = await connection.db(dbConfig.DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should be able to connect to the database", () => {
    expect(connection.isConnected()).toBe(true);
  });
});
