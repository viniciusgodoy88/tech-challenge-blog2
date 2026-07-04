module.exports = {
  testEnvironment: "node",

  // 🔥 aumenta timeout para testes E2E (login, DB, etc.)
  testTimeout: 15000,

  // 🔥 evita problemas de mock acumulado entre testes
  clearMocks: true,

  // 🔥 garante resolução correta de imports no CI (Linux vs Windows)
  moduleDirectories: ["node_modules", "<rootDir>"],

  // 🔥 permite usar imports tipo: src/...
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  // 🔥 padrão de busca de testes
  testMatch: ["**/tests/**/*.test.js"],

  verbose: true,
};