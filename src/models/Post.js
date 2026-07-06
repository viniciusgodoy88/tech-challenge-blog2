// Importa o Mongoose, utilizado para definir schemas e interagir
// com o banco de dados MongoDB.
const mongoose = require("mongoose");

// Define o schema do Post, responsável por estruturar
// como os dados de um post serão armazenados no banco.
const PostSchema = new mongoose.Schema(
  {
    // Identificador numérico único do post.
    id: { 
      type: Number, 
      unique: true 
    },

    // Título do post.
    // Obrigatório e com tamanho entre 5 e 100 caracteres.
    title: { 
      type: String, 
      required: true, 
      minlength: 5, 
      maxlength: 100 
    },

    // Autor do post (nome ou identificador).
    author: { 
      type: String, 
      required: true 
    },

    // Conteúdo principal do post.
    content: { 
      type: String, 
      required: true 
    },
  },
  {
    // Adiciona automaticamente campos de criação e atualização
    // (createdAt e updatedAt).
    timestamps: true
  }
);

// Cria um índice de texto para permitir busca eficiente
// nos campos "title" e "content".
PostSchema.index({ title: "text", content: "text" });

// Cria e exporta o modelo "Post" baseado no schema definido.
// Ele será utilizado para operações no MongoDB.
module.exports = mongoose.model("Post", PostSchema);