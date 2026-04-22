import express from "express";

import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import disciplinaRoutes from "./routes/disciplinaRoutes.js";
import turmaRoutes from "./routes/turmaRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import notaRoutes from "./routes/notaRoutes.js";

const app = express();

app.use(express.json());


app.use("/auth", authRoutes);

app.use("/usuarios", usuarioRoutes);
app.use("/professores", professorRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/turmas", turmaRoutes);
app.use("/alunos", alunoRoutes);
app.use("/notas", notaRoutes);

export default app;