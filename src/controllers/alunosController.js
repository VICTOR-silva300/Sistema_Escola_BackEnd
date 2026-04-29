import {
  findAllAlunos,
  findAlunosComTurma,
  createAluno,
  updateAluno,
  deleteAluno
} from "../models/alunosModel.js";

export const listarAlunos = async (req, res) => {
  try {
    const data = await findAllAlunos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarAlunosComTurma = async (req, res) => {
  try {
    const data = await findAlunosComTurma();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const criarAluno = async (req, res) => {
  try {
    const { nome, cpf, email, telefone, turma_id, status } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ erro: "Nome e CPF obrigatórios" });
    }

    await createAluno({
      nome,
      cpf,
      email,
      telefone,
      turma_id,
      status
    });

    res.status(201).json({ mensagem: "Aluno criado" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    await updateAluno(id, req.body);

    res.json({ mensagem: "Aluno atualizado" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteAluno(id);

    res.json({ mensagem: "Aluno deletado" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};