const prisma = require('../database/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==============================================================================
// REGISTRO DE USUÁRIOS (RBAC: Apenas SUPERADMIN/ADMIN define permissões)
// ==============================================================================
async function register(req, res) {
  try {
    const { name, email, pass, password, role } = req.body;
    const userPassword = password || pass;

    if (!email || !userPassword) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    // 1. Verificar se o e-mail já está cadastrado
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado na plataforma." });
    }

    // 2. Verifica se quem faz a requisição é um SUPERUSUÁRIO / ADMIN
    const isSuperUser = req.user && (req.user.role === 'SUPERADMIN' || req.user.role === 'ADMIN');

    // 3. REGRA DE SEGURANÇA:
    // Se for Superusuário, aceita a role enviada no body.
    // Se for cadastro público ou usuário comum, FORÇA a role para 'STUDENT'.
    const finalRole = isSuperUser && role ? role : 'STUDENT';

    // 4. Hash da senha
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // 5. Criação do usuário no Banco de Dados
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: finalRole,
      },
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
  }
}

// ==============================================================================
// AUTENTICAÇÃO E LOGIN (Geração de Token JWT com a Role)
// ==============================================================================
async function login(req, res) {
  try {
    const { email, pass, password } = req.body;
    const userPassword = password || pass;

    if (!email || !userPassword) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    // 1. Buscar usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // 2. Verificar correspondência da senha criptografada
    const isPasswordValid = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // 3. Gerar o token JWT contendo ID, E-mail e Role
    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno ao realizar login." });
  }
}

module.exports = {
  register,
  login,
};