// Importa a biblioteca JWT, utilizada para gerar tokens de autenticação.
const jwt = require("jsonwebtoken");

// Simula um banco de dados em memória para armazenar os usuários.
// Os dados serão perdidos sempre que a aplicação for reiniciada.
const users = [];

// Classe responsável pelas operações de autenticação.
class AuthController {

  // Realiza o cadastro de um novo usuário.
  register(req, res) {
    const { email, password } = req.body;

    // Verifica se já existe um usuário com o mesmo e-mail.
    const exists = users.find(u => u.email === email);

    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Cria um novo usuário atribuindo um ID sequencial.
    const user = {
      id: users.length + 1,
      email,
      password,
    };

    // Adiciona o usuário ao armazenamento em memória.
    users.push(user);

    // Retorna o usuário criado com status HTTP 201 (Created).
    return res.status(201).json(user);
  }

  // Realiza o login do usuário.
  login(req, res) {
    const { email, password } = req.body;

    // Procura um usuário com e-mail e senha informados.
    const user = users.find(
      u => u.email === email && u.password === password
    );

    // Caso o usuário não seja encontrado, retorna erro de autenticação.
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Gera um token JWT contendo o ID e o e-mail do usuário.
    // O token possui validade de 1 hora.
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secret_key",
      { expiresIn: "1h" }
    );

    // Retorna o token de acesso para o cliente.
    return res.status(200).json({
      accessToken: token
    });
  }
}

// Exporta uma única instância do controlador de autenticação.
module.exports = new AuthController();