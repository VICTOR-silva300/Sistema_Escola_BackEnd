import conexao from "../config/db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [data] = await conn.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios"
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar usuários",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const criarUsuario = async (req, res) => {
  let conn;

  try {
    const { nome, email, senha, perfil } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Nome, email e senha são obrigatórios"
      });
    }

    conn = await conexao.getConnection();

    const [existente] = await conn.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existente.length > 0) {
      return res.status(400).json({
        mensagem: "Email já cadastrado"
      });
    }

    const hash = await bcrypt.hash(senha, 10);

    const [result] = await conn.query(
      "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
      [nome, email, hash, perfil || "admin"]
    );

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      id: result.insertId
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao criar usuário",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarUsuario = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;
    const { nome, email, perfil, senha } = req.body;

    conn = await conexao.getConnection();

    const [user] = await conn.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado"
      });
    }

    const campos = [];
    const params = [];

    if (nome) {
      campos.push("nome=?");
      params.push(nome);
    }

    if (email) {
      campos.push("email=?");
      params.push(email);
    }

    if (perfil) {
      campos.push("perfil=?");
      params.push(perfil);
    }

    if (senha) {
      const hash = await bcrypt.hash(senha, 10);
      campos.push("senha=?");
      params.push(hash);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        mensagem: "Nada para atualizar"
      });
    }

    const query = `UPDATE usuarios SET ${campos.join(", ")} WHERE id=?`;
    params.push(id);

    await conn.query(query, params);

    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};

export const deletarUsuario = async (req, res) => {
  let conn;

  try {
    const { id } = req.params;

    conn = await conexao.getConnection();

    const [user] = await conn.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado"
      });
    }

    await conn.query("DELETE FROM usuarios WHERE id=?", [id]);

    return res.status(200).json({
      mensagem: "Usuário deletado com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao deletar usuário",
      erro: error.message
    });
  } finally {
    if (conn) conn.release();
  }
};