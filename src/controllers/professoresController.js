import {
  findAllProfessores,
  createProfessor,
  updateProfessor,
  deleteProfessor
} from "../models/professoresModel.js";

export const listarProfessores = async (req, res) => {
  try {
    const professores = await findAllProfessores();
    res.json(professores);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarProfessor = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    await createProfessor(nome, email, telefone, especialidade);

    res.status(201).json({ mensagem: "Professor criado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, especialidade } = req.body;

    await updateProfessor(id, nome, email, telefone, especialidade);

    res.json({ mensagem: "Professor atualizado" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteProfessor(id);

    res.json({ mensagem: "Professor deletado" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};