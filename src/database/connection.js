// Importa a biblioteca Mongoose, utilizada para conectar
// e gerenciar o banco de dados MongoDB.
const mongoose = require('mongoose');

// Função assíncrona responsável por estabelecer a conexão
// da aplicação com o MongoDB.
const connectDatabase = async () => {
    try {
        // Realiza a conexão utilizando a URI armazenada
        // na variável de ambiente MONGODB_URI.
        await mongoose.connect(process.env.MONGODB_URI);

        // Exibe uma mensagem indicando que a conexão foi realizada com sucesso.
        console.log('MongoDB conectado com sucesso.');
    } catch (error) {
        // Exibe a mensagem de erro caso a conexão falhe.
        console.error('Erro ao conectar ao MongoDB:', error.message);

        // Encerra a aplicação com código de erro para evitar
        // que ela continue executando sem conexão com o banco.
        process.exit(1);
    }
};

// Exporta a função para que ela possa ser utilizada
// na inicialização da aplicação.
module.exports = connectDatabase;