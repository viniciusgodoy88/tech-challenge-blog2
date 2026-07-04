const jwt = require("jsonwebtoken");

const users = [];

class AuthController {
  register(req, res) {
    const { email, password } = req.body;

    const exists = users.find(u => u.email === email);

    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = {
      id: users.length + 1,
      email,
      password,
    };

    users.push(user);

    return res.status(201).json(user);
  }

  login(req, res) {
    const { email, password } = req.body;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secret_key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      accessToken: token
    });
  }
}

module.exports = new AuthController();