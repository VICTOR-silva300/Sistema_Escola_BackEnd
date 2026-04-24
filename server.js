import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger.js";

import authRoutes from "./src/routes/authRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import professorRoutes from "./src/routes/professoresRoutes.js";
import turmasRoutes from "./src/routes/turmasRoutes.js";
import disciplinasRoutes from "./src/routes/disciplinasRoutes.js";
import notasRoutes from "./src/routes/notasRoutes.js";
import alunoRoutes from "./src/routes/alunosRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sistema-de-escola.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning"
  ]
}));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/professores", professorRoutes);
app.use("/turmas", turmasRoutes);
app.use("/disciplinas", disciplinasRoutes);
app.use("/notas", notasRoutes);
app.use("/alunos", alunoRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ msg: "Api funcionando" });
});

app.get("/teste", (req, res) => {
  res.status(200).json({ ok: true });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/api-docs`);
});