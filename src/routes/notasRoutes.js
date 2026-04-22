import { Router } from "express";
import {
  listarNotas,
  criarNota,
  atualizarNota,
  deletarNota
} from "../controllers/notaController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarNotas);
router.post("/", verificarToken, criarNota);
router.put("/:id", verificarToken, atualizarNota);
router.delete("/:id", verificarToken, deletarNota);

export default router;