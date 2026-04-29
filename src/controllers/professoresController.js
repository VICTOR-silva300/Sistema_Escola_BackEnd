import {
  findAllProfessores,
  findProfessoresComTurmas,
  createProfessor,
  updateProfessor,
  deleteProfessor
} from "../models/professoresModel.js";

export const listarProfessores = async (req, res) => {
  try {
    const professores = await findAllProfessores();
    return res.json(professores);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

export const listarProfessoresComTurmas = async (req, res) => {
  try {
    const data = await findProfessoresComTurmas();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

export const criarProfessor = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const id = await createProfessor(nome, email, telefone, especialidade);

    return res.status(201).json({
      mensagem: "Professor criado com sucesso",
      id
    });

  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

export const atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, especialidade } = req.body;

    const ok = await updateProfessor(id, nome, email, telefone, especialidade);

    if (!ok) {
      return res.status(404).json({ erro: "Professor não encontrado" });
    }

    return res.json({ mensagem: "Professor atualizado" });

  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

export const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProfessor(id);

    if (result.blocked) {
      return res.status(400).json({
        erro: "Professor vinculado a turmas"
      });
    }

    return res.json({ mensagem: "Professor deletado" });

  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};