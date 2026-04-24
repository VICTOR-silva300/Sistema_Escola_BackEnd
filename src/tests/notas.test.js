import request from "supertest";
import app from "../app.js";

describe("NOTAS API", () => {

  it("GET /notas - deve listar notas", async () => {
    const res = await request(app).get("/notas");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /notas - deve criar nota", async () => {
    const res = await request(app)
      .post("/notas")
      .send({
        aluno_id: 1,
        disciplina_id: 1,
        nota: 8.5,
        bimestre: 1,
        observacao: "Boa performance"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST /notas - erro sem aluno_id", async () => {
    const res = await request(app)
      .post("/notas")
      .send({
        disciplina_id: 1,
        nota: 8.5
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("POST /notas - erro sem disciplina_id", async () => {
    const res = await request(app)
      .post("/notas")
      .send({
        aluno_id: 1,
        nota: 8.5
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("POST /notas - erro sem nota", async () => {
    const res = await request(app)
      .post("/notas")
      .send({
        aluno_id: 1,
        disciplina_id: 1
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("PUT /notas/:id - deve atualizar nota", async () => {
    const res = await request(app)
      .put("/notas/1")
      .send({
        nota: 9
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /notas/:id - deve deletar nota", async () => {
    const res = await request(app).delete("/notas/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});