import conexao from "../config/db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  let conn;
  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios"
    );

    res.json(data);
  } finally {
    if (conn) conn.release();
  }
};

export const criarUsuario = async (req, res) => {
  let conn;
  try {
    const { nome, email, senha, perfil } = req.body;
    const hash = await bcrypt.hash(senha, 10);

    conn = await conexao.getConnection();

    await conn.query(
      "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
      [nome, email, hash, perfil]
    );

    res.status(201).json({ mensagem: "Usuário criado" });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarUsuario = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nome, email, perfil } = req.body;

    conn = await conexao.getConnection();

    await conn.query(
      "UPDATE usuarios SET nome=?, email=?, perfil=? WHERE id=?",
      [nome, email, perfil, id]
    );

    res.json({ mensagem: "Atualizado" });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarUsuario = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    await conn.query("DELETE FROM usuarios WHERE id=?", [id]);

    res.json({ mensagem: "Deletado" });
  } finally {
    if (conn) conn.release();
  }
};