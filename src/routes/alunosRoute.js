import { Router } from "express";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  deletarAluno
} from "../controllers/alunoController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarAlunos);
router.post("/", verificarToken, criarAluno);
router.put("/:id", verificarToken, atualizarAluno);
router.delete("/:id", verificarToken, deletarAluno);

export default router;