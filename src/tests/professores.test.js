import request from "supertest";
import app from "../app.js";

describe("PROFESSORES API", () => {

  it("GET /professores - deve listar professores", async () => {
    const res = await request(app).get("/professores");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /professores - deve criar professor", async () => {
    const res = await request(app)
      .post("/professores")
      .send({
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "999999999",
        especialidade: "Matemática"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST /professores - erro sem nome", async () => {
    const res = await request(app)
      .post("/professores")
      .send({
        email: "teste@email.com"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });

  it("PUT /professores/:id - deve atualizar professor", async () => {
    const res = await request(app)
      .put("/professores/1")
      .send({
        nome: "Atualizado",
        email: "novo@email.com",
        telefone: "888888888",
        especialidade: "Física"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /professores/:id - deve deletar professor", async () => {
    const res = await request(app).delete("/professores/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});