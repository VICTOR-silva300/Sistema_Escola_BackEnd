import request from "supertest";
import app from "../app.js";

let token;
let alunoId;
let disciplinaId;
let notaId;

beforeAll(async () => {

  const login = await request(app)
    .post("/auth/login")
    .send({
      email: "vitor@gmail.com",
      senha: "1234"
    });

  expect(login.statusCode).toBe(200);

  token = login.body.token;

  const aluno = await request(app)
    .post("/alunos")
    .set("Authorization", `Bearer ${token}`)
    .send({
      nome: "Aluno Teste",
      cpf: Math.floor(
        Math.random() * 90000000000 + 10000000000
      ).toString(),
      email: `aluno${Date.now()}@email.com`,
      telefone: "999999999",
      turma_id: null,
      status: "ativo"
    });

  console.log(aluno.body);

  expect(aluno.statusCode).toBe(201);

  alunoId = aluno.body.id;

  const disciplina = await request(app)
    .post("/disciplinas")
    .set("Authorization", `Bearer ${token}`)
    .send({
      nome: `Matemática ${Date.now()}`,
      carga_horaria: 80
    });

  console.log(disciplina.body);

  expect(disciplina.statusCode).toBe(201);

  disciplinaId = disciplina.body.id;

});

describe("NOTAS API", () => {

  it("GET /notas", async () => {

    const res = await request(app)
      .get("/notas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  it("POST /notas", async () => {

    const res = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 8.5,
        bimestre: 1,
        observacao: "Boa nota"
      });

    console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");

    notaId = res.body.id;

  });

  it("GET /notas/:id", async () => {

    const res = await request(app)
      .get(`/notas/${notaId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");

  });

  it("PUT /notas/:id", async () => {

    const res = await request(app)
      .put(`/notas/${notaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 9.5,
        bimestre: 2,
        observacao: "Nota atualizada"
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");

  });

  it("DELETE /notas/:id", async () => {

    const res = await request(app)
      .delete(`/notas/${notaId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");

  });

  it("POST erro sem aluno_id", async () => {

    const res = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        disciplina_id: disciplinaId,
        nota: 8
      });

    expect(res.statusCode).toBe(400);

  });

  it("POST erro sem disciplina_id", async () => {

    const res = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: alunoId,
        nota: 8
      });

    expect(res.statusCode).toBe(400);

  });

  it("POST erro sem nota", async () => {

    const res = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId
      });

    expect(res.statusCode).toBe(400);

  });

});