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

  token = login.body.token;
});

describe("PROFESSORES API", () => {

  it("GET /professores", async () => {
    const res = await request(app)
      .get("/professores")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /professores", async () => {
    const res = await request(app)
      .post("/professores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "999999999",
        especialidade: "Matemática"
      });

    expect(res.statusCode).toBe(201);
  });

 it("DELETE /professores/:id", async () => {
  const res = await request(app)
    .delete("/professores/1")
    .set("Authorization", `Bearer ${token}`);

  expect([200, 404, 400]).toContain(res.statusCode);
});
});