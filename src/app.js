import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import professorRoutes from "./routes/professoresRoutes.js";
import disciplinaRoutes from "./routes/disciplinasRoutes.js";
import turmaRoutes from "./routes/turmasRoutes.js";
import alunoRoutes from "./routes/alunosRoutes.js";
import notaRoutes from "./routes/notasRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/professores", professorRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/turmas", turmaRoutes);
app.use("/alunos", alunoRoutes);
app.use("/notas", notaRoutes);

export default app;