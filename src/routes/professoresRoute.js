import { Router } from "express";
import {
  listarProfessores,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor
} from "../controllers/professorController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarProfessores);
router.post("/", verificarToken, criarProfessor);
router.put("/:id", verificarToken, atualizarProfessor);
router.delete("/:id", verificarToken, deletarProfessor);

export default router;