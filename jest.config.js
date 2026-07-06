// Exporta as configurações do Jest utilizadas na execução dos testes.
module.exports = {
  // Define o ambiente de testes como Node.js.
  // Indicado para aplicações backend que não utilizam navegador.
  testEnvironment: "node",

  // Define o tempo máximo de execução de cada teste (15 segundos).
  // Se ultrapassar esse tempo, o teste será encerrado com erro.
  testTimeout: 15000,

  // Define os diretórios onde o Jest irá procurar módulos importados.
  // Permite importar arquivos da pasta "src" sem utilizar caminhos relativos.
  moduleDirectories: ["node_modules", "src"],

  // Cria um alias para facilitar as importações.
  // Exemplo:
  // require("src/services/PostService")
  // em vez de:
  // require("../../src/services/PostService")
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  }
};