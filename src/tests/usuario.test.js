import request from "supertest";
import app from "../app.js";

describe("USUÁRIOS API", () => {

  it("GET /usuarios - deve listar usuários", async () => {
    const res = await request(app).get("/usuarios");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /usuarios - deve criar usuário", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Admin Teste",
        email: "admin@email.com",
        senha: "123456",
        perfil: "admin"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST /usuarios - erro sem senha", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: "teste@email.com",
        perfil: "admin"
      });

    expect(res.statusCode).toBe(400);
  });

  it("PUT /usuarios/:id - deve atualizar usuário", async () => {
    const res = await request(app)
      .put("/usuarios/1")
      .send({
        nome: "Atualizado",
        email: "novo@email.com",
        perfil: "admin"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /usuarios/:id - deve deletar usuário", async () => {
    const res = await request(app).delete("/usuarios/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});