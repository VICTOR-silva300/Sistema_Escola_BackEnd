import { Router } from "express";
import {
  listarAlunos,
  listarAlunosComTurma,
  criarAluno,
  atualizarAluno,
  deletarAluno
} from "../controllers/alunosController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 */
router.get("/", verificarToken, listarAlunos);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
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
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               telefone:
 *                 type: string
 *                 example: "999999999"
 *               turma_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: ativo
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post("/", verificarToken, criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               turma_id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado
 */
router.put("/:id", verificarToken, atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 */
router.delete("/:id", verificarToken, deletarAluno);

/**
 * @swagger
 * /alunos/alunos-turma:
 *   get:
 *     summary: Lista alunos com suas respectivas turmas
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos com turmas retornada com sucesso
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
 *                   cpf:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefone:
 *                     type: string
 *                   status:
 *                     type: string
 *                   turma:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       ano_letivo:
 *                         type: string
 */
router.get("/alunos-turma", verificarToken, listarAlunosComTurma);

export default router;