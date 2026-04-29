import conexao from "../config/db.js";

export const findAllNotas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        n.id,
        n.nota,
        n.bimestre,
        n.observacao,
        n.aluno_id,
        a.nome AS aluno,
        n.disciplina_id,
        d.nome AS disciplina
      FROM notas n
      LEFT JOIN alunos a ON a.id = n.aluno_id
      LEFT JOIN disciplinas d ON d.id = n.disciplina_id
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findNotasComAlunoeDisciplina = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        n.id,
        n.nota,
        n.bimestre,
        a.nome AS aluno,
        d.nome AS disciplina
      FROM notas n
      INNER JOIN alunos a ON a.id = n.aluno_id
      INNER JOIN disciplinas d ON d.id = n.disciplina_id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createNota = async (nota) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO notas 
      (aluno_id, disciplina_id, nota, bimestre, observacao)
      VALUES (?, ?, ?, ?, ?)`,
      [
        nota.aluno_id,
        nota.disciplina_id,
        nota.nota,
        nota.bimestre ?? 1,
        nota.observacao ?? null
      ]
    );

    return result.insertId;
  } finally {
    conn.release();
  }
};

export const updateNota = async (id, nota) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `UPDATE notas 
       SET aluno_id=?, disciplina_id=?, nota=?, bimestre=?, observacao=?
       WHERE id=?`,
      [
        nota.aluno_id,
        nota.disciplina_id,
        nota.nota,
        nota.bimestre ?? 1,
        nota.observacao ?? null,
        id
      ]
    );

    return result;
  } finally {
    conn.release();
  }
};

export const deleteNota = async (id) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query("DELETE FROM notas WHERE id=?", [id]);
  } finally {
    conn.release();
  }
};