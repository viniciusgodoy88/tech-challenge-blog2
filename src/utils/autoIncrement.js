// Importa o modelo Counter, responsável por armazenar
// valores sequenciais no banco de dados MongoDB.
const Counter = require("../models/Counter");

// Função assíncrona responsável por gerar o próximo valor
// sequencial de um determinado contador.
const getNextSequence = async (name) => {

  // Busca um contador pelo nome e incrementa seu valor em 1.
  // Caso não exista, cria automaticamente um novo documento (upsert).
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    {
      // Retorna o documento já atualizado.
      new: true,

      // Cria o contador caso ele não exista.
      upsert: true
    }
  );

  // Retorna o valor atualizado da sequência.
  return counter.seq;
};

// Exporta a função para ser utilizada em outras partes da aplicação,
// geralmente para gerar IDs incrementais.
module.exports = getNextSequence;