import request from "supertest";
import app from "../app.js";

let token;
let professorId;

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
        email: `joao${Date.now()}@email.com`,
        telefone: "999999999",
        especialidade: "Matemática"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");

    professorId = res.body.id;
  });

  it("DELETE /professores/:id", async () => {
    const res = await request(app)
      .delete(`/professores/${professorId}`)
      .set("Authorization", `Bearer ${token}`);

    expect([200, 400]).toContain(res.statusCode);
  });

});