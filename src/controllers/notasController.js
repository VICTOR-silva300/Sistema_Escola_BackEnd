import {
  findAllNotas,
  findNotasComAlunoeDisciplina,
  createNota,
  updateNota,
  deleteNota
} from "../models/notasModel.js";

export const listarNotas = async (req, res) => {
  try {
    const data = await findAllNotas();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarNotasComJoin = async (req, res) => {
  try {
    const data = await findNotasComAlunoeDisciplina();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const criarNota = async (req, res) => {
  try {
    const { aluno_id, disciplina_id, nota, bimestre, observacao } = req.body;

    if (!aluno_id || !disciplina_id || nota == null) {
      return res.status(400).json({
        erro: "Aluno, disciplina e nota são obrigatórios"
      });
    }

    const id = await createNota({
      aluno_id,
      disciplina_id,
      nota,
      bimestre: bimestre ?? 1,
      observacao
    });

    return res.status(201).json({
      mensagem: "Nota criada",
      id
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const atualizarNota = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateNota(id, req.body);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ erro: "Nota não encontrada" });
    }

    res.json({ mensagem: "Nota atualizada" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const deletarNota = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteNota(id);

    res.json({ mensagem: "Nota deletada" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};