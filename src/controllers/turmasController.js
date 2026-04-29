import {
  createTurma,
  findAllTurmas,
  findTurmasComProfessor,
  updateTurma,
  deleteTurma
} from "../models/turmasModel.js";

export const listarTurmas = async (req, res) => {
  try {
    const data = await findAllTurmas();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const listarTurmasComProfessor = async (req, res) => {
  try {
    const data = await findTurmasComProfessor();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const criarTurma = async (req, res) => {
  try {
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({ erro: "Nome e ano são obrigatórios" });
    }

    const id = await createTurma(nome, ano_letivo, professor_id ?? null);

    return res.status(201).json({
      mensagem: "Turma criada",
      id
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    const result = await updateTurma(id, nome, ano_letivo, professor_id ?? null);

    if (!result) {
      return res.status(404).json({ erro: "Turma não encontrada" });
    }

    return res.json({ mensagem: "Turma atualizada" });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteTurma(id);

    if (!result) {
      return res.status(404).json({ erro: "Turma não encontrada" });
    }

    return res.json({ mensagem: "Turma deletada" });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};