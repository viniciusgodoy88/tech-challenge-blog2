module.exports = {
  testEnvironment: "node",
  testTimeout: 15000,

  moduleDirectories: ["node_modules", "src"],

  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  }
};