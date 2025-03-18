const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar eventos do Node aqui, se necessário
    },
    defaultCommandTimeout: 10000, // Aumenta para 10 segundos
    baseUrl: "http://localhost:3000", // Altere para a URL do seu projeto
    supportFile: "cypress/support/e2e.js",
  },
});