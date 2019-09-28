const { MongoClient } = require("mongodb");
const dbConfig = require("../../src/app/config/database");

describe("database connection test", () => {
  let connection;
  let db;
  let userId = "";

  beforeAll(async () => {
    connection = await MongoClient.connect(
      `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    db = await connection.db(dbConfig.DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
    await db.dropDatabase();
  });

  it("should be able to connect to the database", () => {
    expect(connection.isConnected()).toBe(true);
  });
});
