// Importa o Mongoose, biblioteca responsável por modelar e interagir
// com o banco de dados MongoDB.
const mongoose = require("mongoose");

// Define o schema (estrutura) do modelo Counter.
// Ele será usado para armazenar contadores sequenciais no banco.
const CounterSchema = new mongoose.Schema({
  
  // Nome identificador do contador (ex: "postId", "userId").
  name: { 
    type: String, 
    required: true 
  },

  // Valor numérico do contador.
  // Começa em 0 por padrão e pode ser incrementado.
  seq: { 
    type: Number, 
    default: 0 
  },
});

// Cria e exporta o modelo "Counter" baseado no schema definido.
// Esse modelo será usado para realizar operações no MongoDB.
module.exports = mongoose.model("Counter", CounterSchema);