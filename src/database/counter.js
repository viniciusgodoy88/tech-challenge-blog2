// Importa o modelo Counter, responsável por armazenar
// contadores sequenciais no MongoDB.
const Counter = require('../models/Counter');

// Função assíncrona responsável por gerar o próximo número
// sequencial para um determinado contador.
const getNextSequence = async (name) => {

    // Procura um contador pelo nome informado.
    // Caso exista, incrementa o campo "sequence" em 1.
    // Caso não exista, cria automaticamente um novo documento.
    const counter = await Counter.findOneAndUpdate(
        { name },
        { $inc: { sequence: 1 } },
        {
            // Retorna o documento atualizado após o incremento.
            new: true,

            // Cria o documento caso ele ainda não exista.
            upsert: true,
        }
    );

    // Retorna o valor atualizado da sequência.
    return counter.sequence;
};

// Exporta a função para que possa ser utilizada
// em outras partes da aplicação.
module.exports = getNextSequence;