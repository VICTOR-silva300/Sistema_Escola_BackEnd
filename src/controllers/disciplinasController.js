import conexao from "../config/db.js";
import {
  findDisciplinasComNotas,
  findDisciplinaById
} from "../models/disciplinasModel.js";

export const listarDisciplinas = async (req, res) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query(
      "SELECT * FROM disciplinas"
    );

    res.json(data);

  } catch (err) {
    res.status(500).json({ erro: err.message });

  } finally {
    if (conn) conn.release();
  }
};

export const listarDisciplinasComNotas = async (req, res) => {
  try {
    const data = await findDisciplinasComNotas();

    return res.json(data);

  } catch (err) {
    return res.status(500).json({
      erro: err.message
    });
  }
};

export const listarDisciplinaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const disciplina = await findDisciplinaById(id);

    if (!disciplina) {
      return res.status(404).json({
        erro: "Disciplina não encontrada"
      });
    }

    res.json(disciplina);

  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
};

export const criarDisciplina = async (req, res) => {
  let conn;

  try {
    const { nome, carga_horaria } = req.body;

    if (!nome || !carga_horaria) {
      return res.status(400).json({
        erro: "Nome e carga horária são obrigatórios"
      });
    }

    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `INSERT INTO disciplinas
      (nome, carga_horaria)
      VALUES (?, ?)`,
      [nome, carga_horaria]
    );

    res.status(201).json({
      mensagem: "Disciplina criada",
      id: result.insertId
    });

  } catch (err) {
    res.status(500).json({
      erro: err.message
    });

  } finally {
    if (conn) conn.release();
  }
};

export const atualizarDisciplina = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;
    const { nome, carga_horaria } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      `UPDATE disciplinas
       SET nome=?, carga_horaria=?
       WHERE id=?`,
      [nome, carga_horaria, id]
    );

    res.json({
      mensagem: "Atualizado"
    });

  } catch (err) {
    res.status(500).json({
      erro: err.message
    });

  } finally {
    if (conn) conn.release();
  }
};

export const deletarDisciplina = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query(
      "DELETE FROM disciplinas WHERE id=?",
      [id]
    );

    res.json({
      mensagem: "Deletado"
    });

  } catch (err) {
    res.status(500).json({
      erro: err.message
    });

  } finally {
    if (conn) conn.release();
  }
};