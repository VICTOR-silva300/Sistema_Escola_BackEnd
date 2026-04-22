import { Router } from "express";
import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma
} from "../controllers/turmaController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarTurmas);
router.post("/", verificarToken, criarTurma);
router.put("/:id", verificarToken, atualizarTurma);
router.delete("/:id", verificarToken, deletarTurma);

export default router;