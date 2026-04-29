import { Router } from "express";
import {
  listarProfessores,
  listarProfessoresComTurmas,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor
} from "../controllers/professoresController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: Gerenciamento de professores
 */

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
 */
router.get("/", verificarToken, listarProfessores);

/**
 * @swagger
 * /professores:
 *   post:
 *     summary: Cadastra um professor
 *     tags: [Professores]
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
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: professor@email.com
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *               especialidade:
 *                 type: string
 *                 example: Matemática
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 */
router.post("/", verificarToken, criarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   put:
 *     summary: Atualiza um professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               especialidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 */
router.put("/:id", verificarToken, atualizarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   delete:
 *     summary: Remove um professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Professor removido com sucesso
 */
router.delete("/:id", verificarToken, deletarProfessor);

router.get("/", verificarToken,  listarProfessoresComTurmas);

export default router;