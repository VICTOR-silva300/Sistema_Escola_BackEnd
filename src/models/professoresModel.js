import conexao from "../config/db.js";

export const findAllProfessores = async () => {
  const conn = await conexao.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM professores");
    return rows;
  } finally {
    conn.release();
  }
};

export const createProfessor = async (nome, email, especialidade) => {
  const conn = await conexao.getConnection();
  try {
    await conn.query(
      "INSERT INTO professores (nome, email, especialidade) VALUES (?, ?, ?)",
      [nome, email, especialidade]
    );
  } finally {
    conn.release();
  }
};

export const updateProfessor = async (id, nome, email, especialidade) => {
  const conn = await conexao.getConnection();
  try {
    await conn.query(
      "UPDATE professores SET nome=?, email=?, especialidade=? WHERE id=?",
      [nome, email, especialidade, id]
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