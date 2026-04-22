import conexao from "../config/db.js";

export const listarAlunos = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query(`
      SELECT a.id, a.nome, t.nome AS turma
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
    `);

    res.json(data);
  } finally {
    if (conn) conn.release();
  }
};

export const criarAluno = async (req, res) => {
  let conn;
  try {
    const { nome, turma_id } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "INSERT INTO alunos (nome, turma_id) VALUES (?, ?)",
      [nome, turma_id]
    );

    res.status(201).json({ mensagem: "Aluno criado" });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarAluno = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, turma_id } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE alunos SET nome=?, turma_id=? WHERE id=?",
      [nome, turma_id, id]
    );

    res.json({ mensagem: "Atualizado" });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarAluno = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query("DELETE FROM alunos WHERE id=?", [id]);

    res.json({ mensagem: "Deletado" });
  } finally {
    if (conn) conn.release();
  }
};