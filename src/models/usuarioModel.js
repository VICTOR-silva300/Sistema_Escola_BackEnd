import conexao from "../config/db.js";

export const findAllUsuarios = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios"
    );
    return rows;
  } finally {
    conn.release();
  }
};

export const createUsuario = async (nome, email, senhaHash, perfil) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
      [nome, email, senhaHash, perfil]
    );
  } finally {
    conn.release();
  }
};

export const updateUsuario = async (id, nome, email, perfil) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      "UPDATE usuarios SET nome=?, email=?, perfil=? WHERE id=?",
      [nome, email, perfil, id]
    );
  } finally {
    conn.release();
  }
};

export const deleteUsuario = async (id) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query("DELETE FROM usuarios WHERE id=?", [id]);
  } finally {
    conn.release();
  }
};