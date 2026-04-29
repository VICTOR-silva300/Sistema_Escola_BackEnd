import { Router } from "express";
import {
  listarNotas,
  listarNotasComJoin,
  criarNota,
  atualizarNota,
  deletarNota
} from "../controllers/notasController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Gerenciamento de notas dos alunos
 */

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Lista todas as notas
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas retornada com sucesso
 */
router.get("/", verificarToken, listarNotas);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Cadastra uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - disciplina_id
 *               - nota
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               disciplina_id:
 *                 type: integer
 *                 example: 2
 *               nota:
 *                 type: number
 *                 example: 8.5
 *               bimestre:
 *                 type: string
 *                 example: "1"
 *               observacao:
 *                 type: string
 *                 example: "Boa performance"
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post("/", verificarToken, criarNota);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualiza uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aluno_id:
 *                 type: integer
 *               disciplina_id:
 *                 type: integer
 *               nota:
 *                 type: number
 *               bimestre:
 *                 type: string
 *               observacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 */
router.put("/:id", verificarToken, atualizarNota);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Remove uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota removida com sucesso
 */
router.delete("/:id", verificarToken, deletarNota);

/**
 * @swagger
 * /notas/com-join:
 *   get:
 *     summary: Lista notas com dados do aluno e disciplina (JOIN)
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas com relacionamento retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nota:
 *                     type: number
 *                   bimestre:
 *                     type: string
 *                   observacao:
 *                     type: string
 *                   aluno:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                   disciplina:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       carga_horaria:
 *                         type: integer
 */
router.get("/com-join", verificarToken, listarNotasComJoin);

export default router;