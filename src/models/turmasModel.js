import conexao from "../config/db.js";


export const findAllTurmas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        t.id,
        t.nome,
        t.ano_letivo,
        t.professor_id,
        COALESCE(p.nome, 'Sem professor') AS professor
      FROM turmas t
      LEFT JOIN professores p ON p.id = t.professor_id
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findTurmasComProfessor = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        t.id,
        t.nome,
        t.ano_letivo,
        p.nome AS professor
      FROM turmas t
      INNER JOIN professores p ON p.id = t.professor_id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createTurma = async (nome, ano_letivo, professor_id) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      "INSERT INTO turmas (nome, ano_letivo, professor_id) VALUES (?, ?, ?)",
      [nome, ano_letivo, professor_id ?? null]
    );

    return result.insertId;
  } finally {
    conn.release();
  }
};

export const updateTurma = async (id, nome, ano_letivo, professor_id) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `UPDATE turmas 
       SET nome=?, ano_letivo=?, professor_id=? 
       WHERE id=?`,
      [nome, ano_letivo, professor_id ?? null, id]
    );

    return result.affectedRows > 0;
  } finally {
    conn.release();
  }
};

export const deleteTurma = async (id) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      "DELETE FROM turmas WHERE id=?",
      [id]
    );

    return result.affectedRows > 0;
  } finally {
    conn.release();
  }
};