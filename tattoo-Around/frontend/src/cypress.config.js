const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Aumentar o timeout para dar mais tempo aos testes
    defaultCommandTimeout: 10000,
    // Desabilitar verificações de web security para facilitar os testes
    chromeWebSecurity: false,
  },
})