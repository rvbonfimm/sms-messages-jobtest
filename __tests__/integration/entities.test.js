const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../../src/app");
const dbConfig = require("../../src/app/config/database");

describe("application operations", () => {
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

  describe("user operations", () => {
    it("should be able to create a new user", async () => {
      const user = {
        name: "Tester",
        mail: "rogeriotestdev@gmail.com",
        password: "1234mudar"
      };
      const response = await request(app)
        .post("/app/users")
        .send(user);
      expect(response.statusCode).toBe(201);
    });

    it("should not be able to create a new user by existing mail address", async () => {
      const user = {
        name: "Rogerio",
        mail: "rogeriotestdev@gmail.com",
        password: "123"
      };
      const response = await request(app)
        .post("/app/users")
        .send(user);
      expect(response.statusCode).toBe(422);
    });

    it("should return all users registered", async () => {
      const response = await request(app).get("/app/users");
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should not return user by wrong id", async () => {
      userId = "999999999999999999999999";
      const response = await request(app).get(`/app/users/${userId}`);
      expect(response.statusCode).toBe(404);
    });

    it("should return user by id", async () => {
      var responseOne = await request(app).get("/app/users");

      const first = 1;

      responseOne.body.forEach(user => {
        if (first === 1) {
          userId = user._id;
          return;
        }
      });

      const response = await request(app).get(`/app/users/${userId}`);
      expect(response.body).toHaveLength(1);
    });
  });

  describe("Messages operations", () => {
    it("should not return any message by wrong url", async () => {
      const response = await request(app).get("/app/message/");

      expect(response.status).toBe(404);
    });

    it("should return all messages", async () => {
      const response = await request(app).get("/app/messages");

      expect(response.status).toBe(200);
    });

    it("should create a message", async () => {
      const message = {
        userId: userId,
        type: [0],
        data: "TESTE DE MESA"
      };

      const response = await request(app)
        .post("/app/messages")
        .send(message);

      expect(response.statusCode).toBe(201);
    });

    it("should not be able to get a message by wrong id", async () => {
      var messageId = "999999999999999999999999";

      const response = await request(app).get(`/app/messages/${messageId}`);

      expect(response.statusCode).toBe(404);
    });

    it("should be able to get a message by id", async () => {
      const responseOne = await request(app).get("/app/messages");

      var first = 1;
      var messageId = "";

      responseOne.body.forEach(message => {
        if (first === 1) {
          messageId = message._id;
          return;
        }
      });

      const response = await request(app).get(`/app/messages/${messageId}`);

      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
