// Importa a biblioteca Winston, utilizada para registrar logs da aplicação.
const winston = require("winston");

// Cria uma instância do logger com as configurações da aplicação.
const logger = winston.createLogger({
  // Define o nível mínimo de logs que serão registrados.
  // Neste caso, serão registrados logs do tipo "info" e de maior prioridade.
  level: "info",

  // Define o formato dos logs como JSON, facilitando a leitura
  // e integração com ferramentas de monitoramento.
  format: winston.format.json(),

  // Define os destinos (transports) onde os logs serão gravados.
  transports: [
    // Exibe os logs no console da aplicação.
    new winston.transports.Console(),

    // Salva os logs em um arquivo localizado na pasta "logs".
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

// Exporta o logger para que possa ser utilizado em toda a aplicação.
module.exports = logger;