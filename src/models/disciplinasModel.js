import conexao from "../config/db.js";

export const findAllDisciplinas = async () => {
  const conn = await conexao.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM disciplinas");
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