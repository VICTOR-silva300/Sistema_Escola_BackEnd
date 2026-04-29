import request from "supertest";
import app from "../app.js";

let token;
let usuarioId;

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

describe("USUÁRIOS API", () => {

  it("GET /usuarios", async () => {
    const res = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /usuarios", async () => {
    const res = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Vitor Test",
        email: `vitor_${Date.now()}@email.com`,
        senha: "1234",
        perfil: "admin"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");

    usuarioId = res.body.id; 
  });

  it("POST erro sem senha", async () => {
    const res = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Teste",
        email: "teste@email.com",
        perfil: "admin"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("PUT /usuarios/:id", async () => {
    const id = usuarioId || 1;

    const res = await request(app)
      .put(`/usuarios/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Atualizado",
        email: `novo_${Date.now()}@email.com`,
        perfil: "admin"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /usuarios/:id", async () => {
    const id = usuarioId || 1;

    const res = await request(app)
      .delete(`/usuarios/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});