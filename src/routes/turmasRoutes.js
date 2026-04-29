import { Router } from "express";
import {
  listarTurmas,
  listarTurmasComProfessor,
  criarTurma,
  atualizarTurma,
  deletarTurma
} from "../controllers/turmasController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Lista todas as turmas
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
 */
router.get("/", verificarToken, listarTurmas);

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Cria uma turma
 *     tags: [Turmas]
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
 *               - ano_letivo
 *             properties:
 *               nome:
 *                 type: string
 *                 example: 1º Ano A
 *               ano_letivo:
 *                 type: string
 *                 example: 2025
 *               professor_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 */
router.post("/", verificarToken, criarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               ano_letivo:
 *                 type: string
 *               professor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 */
router.put("/:id", verificarToken, atualizarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Remove uma turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma removida com sucesso
 */
router.delete("/:id", verificarToken, deletarTurma);

/**
 * @swagger
 * /turmas/com-professor:
 *   get:
 *     summary: Lista turmas com seus respectivos professores
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas com professores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   ano_letivo:
 *                     type: string
 *                   professor:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       email:
 *                         type: string
 *                       especialidade:
 *                         type: string
 */
router.get("/com-professor", verificarToken, listarTurmasComProfessor);

export default router;      