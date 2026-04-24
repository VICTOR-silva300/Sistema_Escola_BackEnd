import request from "supertest";
import app from "../app.js";

describe("DISCIPLINAS API", () => {

  it("GET /disciplinas - deve listar disciplinas", async () => {
    const res = await request(app).get("/disciplinas");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /disciplinas - deve criar disciplina", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .send({
        nome: "Matemática",
        carga_horaria: 80
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST /disciplinas - erro sem nome", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .send({
        carga_horaria: 80
      });

    expect(res.statusCode).toBe(400);
  });

  it("POST /disciplinas - erro sem carga horária", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .send({
        nome: "História"
      });

    expect(res.statusCode).toBe(400);
  });

  it("PUT /disciplinas/:id - deve atualizar disciplina", async () => {
    const res = await request(app)
      .put("/disciplinas/1")
      .send({
        nome: "Matemática Atualizada",
        carga_horaria: 100
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /disciplinas/:id - deve deletar disciplina", async () => {
    const res = await request(app).delete("/disciplinas/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

});