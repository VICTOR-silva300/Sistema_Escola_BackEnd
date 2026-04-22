import { Router } from "express";
import {
  listarDisciplinas,
  criarDisciplina,
  atualizarDisciplina,
  deletarDisciplina
} from "../controllers/disciplinaController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarDisciplinas);
router.post("/", verificarToken, criarDisciplina);
router.put("/:id", verificarToken, atualizarDisciplina);
router.delete("/:id", verificarToken, deletarDisciplina);

export default router;