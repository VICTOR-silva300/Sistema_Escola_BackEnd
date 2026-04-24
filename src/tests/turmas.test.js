import request from "supertest";
import app from "../app.js";

describe("TURMAS API", () => {

  it("GET /turmas - deve listar turmas", async () => {
    const res = await request(app).get("/turmas");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /turmas - deve criar turma", async () => {
    const res = await request(app)
      .post("/turmas")
      .send({
        nome: "Turma A",
        ano_letivo: 2024,
        professor_id: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST /turmas - erro sem nome", async () => {
    const res = await request(app)
      .post("/turmas")
      .send({
        ano_letivo: 2024
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("POST /turmas - erro sem ano letivo", async () => {
    const res = await request(app)
      .post("/turmas")
      .send({
        nome: "Turma B"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("PUT /turmas/:id - deve atualizar turma", async () => {
    const res = await request(app)
      .put("/turmas/1")
      .send({
        nome: "Turma Atualizada",
        ano_letivo: 2025,
        professor_id: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /turmas/:id - deve deletar turma", async () => {
    const res = await request(app).delete("/turmas/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});