import conexao from "../config/db.js";

export const listarProfessores = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query("SELECT * FROM professores");

    res.json(data);
  } finally {
    if (conn) conn.release();
  }
};

export const criarProfessor = async (req, res) => {
  let conn;
  try {
    const { nome, email, especialidade } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "INSERT INTO professores (nome, email, especialidade) VALUES (?, ?, ?)",
      [nome, email, especialidade]
    );

    res.status(201).json({ mensagem: "Professor criado" });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarProfessor = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, email, especialidade } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE professores SET nome=?, email=?, especialidade=? WHERE id=?",
      [nome, email, especialidade, id]
    );

    res.json({ mensagem: "Atualizado" });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarProfessor = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query("DELETE FROM professores WHERE id=?", [id]);

    res.json({ mensagem: "Deletado" });
  } finally {
    if (conn) conn.release();
  }
};