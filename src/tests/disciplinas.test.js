import request from "supertest";
import app from "../app.js";

let token;

beforeAll(async () => {
  const login = await request(app)
    .post("/auth/login")
    .send({
      email: "vitor@gmail.com",
      senha: "1234"
    });

  expect(login.statusCode).toBe(200);
  token = login.body.token;
});

describe("DISCIPLINAS API", () => {

  it("GET /disciplinas", async () => {
    const res = await request(app)
      .get("/disciplinas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("POST /disciplinas", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Matemática",
        carga_horaria: 80
      });

    expect(res.statusCode).toBe(201);
  });

  it("POST erro sem nome", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({ carga_horaria: 80 });

    expect(res.statusCode).toBe(400);
  });

  it("POST erro sem carga horária", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "História" });

    expect(res.statusCode).toBe(400);
  });
});