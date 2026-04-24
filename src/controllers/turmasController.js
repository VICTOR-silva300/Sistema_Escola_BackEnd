import { 
   createTurma,
   findAllTurmas,
   updateTurma,
   deleteTurma } from "../models/turmasModel.js";

export const listarTurmas = async (req, res) => {
  try {
    const data = await findAllTurmas();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const criarTurma = async (req, res) => {
  try {
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({ erro: "Nome e ano são obrigatórios" });
    }

    await createTurmaModel(nome, ano_letivo, professor_id);

    res.status(201).json({ mensagem: "Turma criada" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizarTurma = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE turmas SET nome=?, ano_letivo=?, professor_id=? WHERE id=?",
      [nome, ano_letivo, professor_id ?? null, id]
    );

    res.json({ mensagem: "Turma atualizada" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarTurma = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query("DELETE FROM turmas WHERE id=?", [id]);

    res.json({ mensagem: "Turma deletada" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  } finally {
    if (conn) conn.release();
  }
};