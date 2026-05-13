import request from "supertest";
import app from "../app.js";

let token;
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
});

describe("DISCIPLINAS API", () => {

  it("GET /disciplinas", async () => {
    const res = await request(app)
      .get("/disciplinas")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /disciplinas", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `Matemática ${Date.now()}`,
        carga_horaria: 80
      });

    console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");

    disciplinaId = res.body.id;
  });

  it("GET /disciplinas/:id", async () => {
    const res = await request(app)
      .get(`/disciplinas/${disciplinaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /disciplinas/:id", async () => {
    const res = await request(app)
      .put(`/disciplinas/${disciplinaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: `História ${Date.now()}`,
        carga_horaria: 100
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("DELETE /disciplinas/:id", async () => {
    const res = await request(app)
      .delete(`/disciplinas/${disciplinaId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensagem");
  });

  it("POST erro sem nome", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        carga_horaria: 80
      });

    expect(res.statusCode).toBe(400);
  });

  it("POST erro sem carga horária", async () => {
    const res = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "História"
      });

    expect(res.statusCode).toBe(400);
  });

});