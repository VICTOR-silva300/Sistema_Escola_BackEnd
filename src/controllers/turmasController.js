import conexao from "../config/db.js";

export const listarTurmas = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query("SELECT * FROM turmas");

    res.json(data);
  } finally {
    if (conn) conn.release();
  }
};

export const criarTurma = async (req, res) => {
  let conn;
  try {
    const { nome, ano } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "INSERT INTO turmas (nome, ano) VALUES (?, ?)",
      [nome, ano]
    );

    res.status(201).json({ mensagem: "Turma criada" });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarTurma = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, ano } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE turmas SET nome=?, ano=? WHERE id=?",
      [nome, ano, id]
    );

    res.json({ mensagem: "Atualizado" });
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

    res.json({ mensagem: "Deletado" });
  } finally {
    if (conn) conn.release();
  }
};