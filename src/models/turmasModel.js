import conexao from "../config/db.js";

export const findAllTurmas = async () => {
  const conn = await conexao.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM turmas");
    return rows;
  } finally {
    conn.release();
  }
};