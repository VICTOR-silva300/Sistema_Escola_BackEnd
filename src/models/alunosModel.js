import conexao from "../config/db.js";

export const findAllAlunos = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT a.id, a.nome, t.nome AS turma
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};