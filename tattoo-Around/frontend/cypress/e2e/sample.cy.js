describe('Página inicial', () => {
    it('deve carregar corretamente', () => {
      cy.visit('/');
      cy.contains('Tattoo Around').should('be.visible');
      // Altere conforme necessário
    });
  });
  