import conexao from "../config/db.js";

export const findAllProfessores = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT * 
      FROM professores
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findProfessoresComTurmas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        p.id,
        p.nome,
        p.email,
        t.nome AS turma,
        t.ano_letivo
      FROM professores p
      INNER JOIN turmas t ON t.professor_id = p.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findProfessoresComTurmasLeft = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        p.id,
        p.nome,
        p.email,
        t.nome AS turma,
        t.ano_letivo
      FROM professores p
      LEFT JOIN turmas t ON t.professor_id = p.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createProfessor = async (nome, email, telefone, especialidade) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO professores (nome, email, telefone, especialidade)
       VALUES (?, ?, ?, ?)`,
      [nome, email, telefone, especialidade]
    );

    return result.insertId;
  } finally {
    conn.release();
  }
};

export const updateProfessor = async (id, nome, email, telefone, especialidade) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `UPDATE professores 
       SET nome=?, email=?, telefone=?, especialidade=? 
       WHERE id=?`,
      [nome, email, telefone, especialidade, id]
    );

    return result.affectedRows > 0;
  } finally {
    conn.release();
  }
};

export const deleteProfessor = async (id) => {
  const conn = await conexao.getConnection();

  try {
    const [turmas] = await conn.query(
      "SELECT id FROM turmas WHERE professor_id = ?",
      [id]
    );

    if (turmas.length > 0) {
      return { blocked: true };
    }

    await conn.query("DELETE FROM professores WHERE id=?", [id]);

    return { deleted: true };

  } finally {
    conn.release();
  }
};