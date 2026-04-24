import request from "supertest";
import app from "../app.js";

describe("ALUNOS API", () => {

  it("GET /alunos - deve listar alunos", async () => {
    const res = await request(app).get("/alunos");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /alunos - deve criar aluno", async () => {
    const res = await request(app)
      .post("/alunos")
      .send({
        nome: "Teste",
        cpf: "12345678900",
        email: "teste@email.com",
        telefone: "999999999",
        turma_id: 1,
        status: "ativo"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST /alunos - erro sem nome", async () => {
    const res = await request(app)
      .post("/alunos")
      .send({
        cpf: "12345678900"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("POST /alunos - erro sem CPF", async () => {
    const res = await request(app)
      .post("/alunos")
      .send({
        nome: "Teste"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("PUT /alunos/:id - deve atualizar aluno", async () => {
    const res = await request(app)
      .put("/alunos/1")
      .send({
        nome: "Atualizado",
        cpf: "12345678900",
        email: "teste@email.com",
        telefone: "999999999",
        turma_id: 1,
        status: "ativo"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /alunos/:id - deve deletar aluno", async () => {
    const res = await request(app).delete("/alunos/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});