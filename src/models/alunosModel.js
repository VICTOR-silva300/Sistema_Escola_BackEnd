import conexao from "../config/db.js";

export const findAllAlunos = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        a.id,
        a.nome,
        a.cpf,
        a.email,
        a.telefone,
        a.status,
        a.turma_id,
        t.nome AS turma
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findAlunosComTurma = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        a.id,
        a.nome,
        a.cpf,
        t.nome AS turma
      FROM alunos a
      INNER JOIN turmas t ON a.turma_id = t.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createAluno = async (aluno) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO alunos 
        (nome, cpf, email, telefone, turma_id, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        aluno.nome,
        aluno.cpf,
        aluno.email,
        aluno.telefone,
        aluno.turma_id,
        aluno.status || "ativo"
      ]
    );

    return result;
  } finally {
    conn.release();
  }
};

export const updateAluno = async (id, aluno) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `UPDATE alunos 
       SET nome=?, cpf=?, email=?, telefone=?, turma_id=?, status=? 
       WHERE id=?`,
      [
        aluno.nome,
        aluno.cpf,
        aluno.email,
        aluno.telefone,
        aluno.turma_id,
        aluno.status,
        id
      ]
    );

    return result;
  } finally {
    conn.release();
  }
};

export const deleteAluno = async (id) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      "DELETE FROM alunos WHERE id = ?",
      [id]
    );

    return result;
  } finally {
    conn.release();
  }
};