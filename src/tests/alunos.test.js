import request from "supertest";
import app from "../app.js";

let token;
let alunoId;

beforeAll(async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({
      email: "vitor@gmail.com",
      senha: "1234"
    });

  if (res.statusCode !== 200) {
    throw new Error("Login falhou");
  }

  token = res.body.token || res.body.accessToken;

  if (!token) {
    throw new Error("Token não retornado!");
  }
});

describe("ALUNOS API", () => {

  it("POST /alunos - deve criar aluno", async () => {
  const res = await request(app)
    .post("/alunos")
    .set("Authorization", `Bearer ${token}`)
    .send({
      nome: "Aluno Teste",
      cpf: Math.floor(Math.random() * 90000000000 + 10000000000).toString(),
      email: `teste${Date.now()}@email.com`,
      telefone: "999999999",
      turma_id: null,
      status: "ativo"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("mensagem");

  alunoId = res.body.id || res.body.aluno?.id;
});

  it("GET /alunos - deve listar alunos", async () => {
    const res = await request(app)
      .get("/alunos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /alunos - deve atualizar aluno", async () => {
    const res = await request(app)
      .put(`/alunos/${alunoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Aluno Atualizado",
        cpf: `${Date.now()}${Math.random()}`,
        email: `update${Date.now()}@email.com`,
        telefone: "999999999",
        turma_id: 1,
        status: "ativo"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /alunos - deve deletar aluno", async () => {
    const res = await request(app)
      .delete(`/alunos/${alunoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});