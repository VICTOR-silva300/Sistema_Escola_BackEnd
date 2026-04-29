import conexao from "../config/db.js";

export const findAllDisciplinas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT * 
      FROM disciplinas
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findDisciplinasComNotas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        d.id,
        d.nome,
        d.carga_horaria,
        n.nota,
        n.bimestre
      FROM disciplinas d
      INNER JOIN notas n ON n.disciplina_id = d.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const findDisciplinasComNotasLeft = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        d.id,
        d.nome,
        d.carga_horaria,
        n.nota,
        n.bimestre
      FROM disciplinas d
      LEFT JOIN notas n ON n.disciplina_id = d.id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createDisciplina = async (nome, carga_horaria) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      "INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)",
      [nome, carga_horaria]
    );
  } finally {
    conn.release();
  }
};