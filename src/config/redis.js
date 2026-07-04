const redis = require("redis");

const client = redis.createClient();

client.connect();

// mock simples para testes
module.exports = {};