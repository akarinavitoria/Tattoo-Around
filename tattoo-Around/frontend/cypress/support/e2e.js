// cypress/support/e2e.js

// Ignorar exceções não tratadas originadas da aplicação
Cypress.on('uncaught:exception', (err, runnable) => {
    // Retorne false para prevenir que o Cypress falhe o teste
    return false;
  });
  