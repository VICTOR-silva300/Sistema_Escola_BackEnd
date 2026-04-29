import request from "supertest";
import app from "../app.js";

let token;
let turmaId;

beforeAll(async () => {
  const login = await request(app)
    .post("/auth/login")
    .send({
      email: "vitor@gmail.com",
      senha: "1234"
    });

  if (login.statusCode !== 200 || !login.body.token) {
    throw new Error("Falha no login");
  }

  token = login.body.token;
});

describe("TURMAS API", () => {

  it("GET /turmas - deve listar turmas", async () => {
    const res = await request(app)
      .get("/turmas")
      .set("Authorization", `Bearer ${token}`);


    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /turmas - deve criar turma", async () => {
    const res = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma Teste",
        ano_letivo: 2024,
        professor_id: null
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");

    turmaId = res.body.id;
  });

  it("POST /turmas - erro sem nome", async () => {
    const res = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ano_letivo: 2024
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("POST /turmas - erro sem ano", async () => {
    const res = await request(app)
      .post("/turmas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma B"
      });


    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("PUT /turmas/:id - deve atualizar turma", async () => {
    const id = turmaId || 1;

    const res = await request(app)
      .put(`/turmas/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Turma Atualizada",
        ano_letivo: 2025,
        professor_id: null
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /turmas/:id - deve deletar turma", async () => {
    const id = turmaId || 1;

    const res = await request(app)
      .delete(`/turmas/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});