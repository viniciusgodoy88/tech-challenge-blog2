// Importa a biblioteca Redis, utilizada para comunicação
// com o servidor Redis.
const redis = require("redis");

// Cria uma nova instância do cliente Redis.
const client = redis.createClient();

// Estabelece a conexão com o servidor Redis.
client.connect();

// Exporta um objeto vazio.
// Neste caso, trata-se de um mock simples utilizado durante os testes,
// evitando que os testes dependam de uma conexão real com o Redis.
module.exports = {};