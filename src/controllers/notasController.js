import conexao from "../config/db.js";

export const listarNotas = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query(`
      SELECT n.id, a.nome AS aluno, d.nome AS disciplina, n.nota
      FROM notas n
      LEFT JOIN alunos a ON n.aluno_id = a.id
      LEFT JOIN disciplinas d ON n.disciplina_id = d.id
    `);

    res.json(data);
  } finally {
    if (conn) conn.release();
  }
};

export const criarNota = async (req, res) => {
  let conn;
  try {
    const { aluno_id, disciplina_id, nota } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "INSERT INTO notas (aluno_id, disciplina_id, nota) VALUES (?, ?, ?)",
      [aluno_id, disciplina_id, nota]
    );

    res.status(201).json({ mensagem: "Nota criada" });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarNota = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nota } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE notas SET nota=? WHERE id=?",
      [nota, id]
    );

    res.json({ mensagem: "Atualizado" });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarNota = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query("DELETE FROM notas WHERE id=?", [id]);

    res.json({ mensagem: "Deletado" });
  } finally {
    if (conn) conn.release();
  }
};