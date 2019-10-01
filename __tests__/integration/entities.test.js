const request = require("supertest");
const api = require("../../src/index");
const agent = request.agent(api);

describe("application operations", () => {
  beforeAll(() =>
    agent
      .post("/login")
      .send({
        mail: "tester@alive.com"
      })
      .expect(200)
      .then(res => {
        const cookies = res.headers["set-cookie"][0]
          .split(",")
          .map(item => item.split(";")[0]);
        cookie = cookies.join(";");
      })
  );

  afterAll(async () => {
    await connection.close();
  });

  describe("user operations", () => {
    it("should not be able to login default user by incorrect credentials", async () =>
      agent
        .post("/login")
        .send({
          mail: "tester@gmail.com"
        })
        .expect(res => {
          res.body.message = "Mail not found";
        }));

    it("should be able to login default user with correct credentials", async () =>
      agent
        .post("/login")
        .send({
          mail: "tester@alive.com"
        })
        .expect(res => {
          res.body.message = "User logged";
        }));

    it("should return all users registered", async () =>
      agent.get("/api/users").expect(200));
  });

  describe("Messages operations", () => {
    it("should return all messages", () =>
      agent.get("/api/messages").expect(200));

    it("should not be able to get a message by wrong id", () =>
      agent
        .get("/api/messages/999999999999999999999999")
        .expect(404)
        .expect({
          error: true,
          message: "Message not found"
        }));

    it("should be able to get a message by id", () =>
      agent
        .get("/api/messages/5d92c9826f3dd9327ccf5392")
        .expect(200)
        .expect(res => {
          (res.body.data = "833777783303_33063377772"),
            (res.body.output = "TESTE DE MESA");
        }));

    it("should not create a message by empty network type", () =>
      agent
        .post("/api/messages")
        .send({
          userId: "5d92bba38a24203bec75e78a",
          networkType: "",
          messageType: "text",
          data: "TESTE DE MESA"
        })
        .expect(404)
        .expect({
          error: true,
          message: "You forgot to specify the Network Type: GSM or CDMA"
        }));

    it("should not create a message by empty network type", () =>
      agent
        .post("/api/messages")
        .send({
          userId: "5d92bba38a24203bec75e78a",
          networkType: "GSM",
          messageType: "",
          data: "TESTE DE MESA"
        })
        .expect(404)
        .expect({
          error: true,
          message: "You forgot to specify the Message Type: Text or Sequence"
        }));

    it("should not create a message by empty input data", () =>
      agent
        .post("/api/messages")
        .send({
          userId: "5d92bba38a24203bec75e78a",
          networkType: "GSM",
          messageType: "Text",
          data: ""
        })
        .expect(404)
        .expect({
          error: true,
          message: "You forgot to specify the Data to be processed"
        }));
  });
});
