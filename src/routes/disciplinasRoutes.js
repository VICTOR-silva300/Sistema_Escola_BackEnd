import { Router } from "express";
import {
  listarDisciplinas,
  listarDisciplinasComNotas,
  criarDisciplina,
  atualizarDisciplina,
  deletarDisciplina
} from "../controllers/disciplinasController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: Gerenciamento de disciplinas
 */

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Lista todas as disciplinas
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de disciplinas retornada com sucesso
 */
router.get("/", verificarToken, listarDisciplinas);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Cria uma disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - carga_horaria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matemática
 *               carga_horaria:
 *                 type: integer
 *                 example: 80
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 */
router.post("/", verificarToken, criarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualiza uma disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               carga_horaria:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Disciplina atualizada
 */
router.put("/:id", verificarToken, atualizarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Remove uma disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Disciplina removida com sucesso
 */
router.delete("/:id", verificarToken, deletarDisciplina);

router.get("/", verificarToken, listarDisciplinasComNotas);

export default router;