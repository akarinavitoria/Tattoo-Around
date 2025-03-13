describe('Página inicial', () => {
    it('deve carregar corretamente', () => {
      cy.visit('/');
      cy.contains('Tattoo Around', { timeout: 10000 }).should('be.visible');
      // Altere conforme necessário
    });
  });
  