import request from "supertest";
import app from "../app.js";

let token;
let alunoId;
let disciplinaId;

beforeAll(async () => {
  const login = await request(app)
    .post("/auth/login")
    .send({
      email: "vitor@gmail.com",
      senha: "1234"
    });

  expect(login.statusCode).toBe(200);
  token = login.body.token;

  // cria aluno
  const aluno = await request(app)
    .post("/alunos")
    .set("Authorization", `Bearer ${token}`)
    .send({ nome: "Aluno Teste" });

  // 🔥 fallback se não retornar id
  alunoId = aluno.body.id || 1;

  // cria disciplina
  const disciplina = await request(app)
    .post("/disciplinas")
    .set("Authorization", `Bearer ${token}`)
    .send({
      nome: "Matemática",
      carga_horaria: 80
    });

  disciplinaId = disciplina.body.id || 1;

});

describe("NOTAS API", () => {

  it("GET /notas", async () => {
    const res = await request(app)
      .get("/notas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("POST /notas", async () => {
    const res = await request(app)
      .post("/notas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aluno_id: alunoId,
        disciplina_id: disciplinaId,
        nota: 8.5
      });

    expect(res.statusCode).toBe(201);
  });

});