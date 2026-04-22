import conexao from "../config/db.js";

export const findAllNotas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT n.id, a.nome AS aluno, d.nome AS disciplina, n.nota
      FROM notas n
      LEFT JOIN alunos a ON n.aluno_id = a.id
      LEFT JOIN disciplinas d ON n.disciplina_id = d.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};