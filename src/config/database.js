const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
  
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  
    throw error;
  }
};

module.exports = connectDatabase;