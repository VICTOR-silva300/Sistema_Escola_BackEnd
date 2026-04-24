import conexao from "../config/db.js";

export const findAllProfessores = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT * FROM professores
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createProfessor = async (professor) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `INSERT INTO professores 
      (nome, email, telefone, especialidade)
      VALUES (?, ?, ?, ?)`,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.especialidade
      ]
    );
  } finally {
    conn.release();
  }
};

export const updateProfessor = async (id, professor) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `UPDATE professores 
       SET nome=?, email=?, telefone=?, especialidade=? 
       WHERE id=?`,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.especialidade,
        id
      ]
    );
  } finally {
    conn.release();
  }
};

export const deleteProfessor = async (id) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query("DELETE FROM professores WHERE id=?", [id]);
  } finally {
    conn.release();
  }
};