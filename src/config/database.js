// Importa a biblioteca Mongoose, responsável por realizar a conexão
// e o gerenciamento do banco de dados MongoDB.
const mongoose = require("mongoose");

// Função assíncrona responsável por conectar a aplicação ao MongoDB.
const connectDatabase = async () => {
  try {
    // Realiza a conexão utilizando a URI definida na variável de ambiente MONGO_URI.
    await mongoose.connect(process.env.MONGO_URI);

    // Exibe uma mensagem indicando que a conexão foi realizada com sucesso.
    console.log("✅ MongoDB conectado com sucesso");
  } catch (error) {
    // Exibe a mensagem de erro caso a conexão falhe.
    console.error("❌ Erro ao conectar no MongoDB:", error);

    // Se a aplicação não estiver em ambiente de testes,
    // encerra o processo para evitar que a API execute sem banco de dados.
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }

    // Em ambiente de testes, relança o erro para que ele possa ser tratado pelo framework de testes.
    throw error;
  }
};

// Exporta a função para que possa ser utilizada em outros arquivos da aplicação.
module.exports = connectDatabase;