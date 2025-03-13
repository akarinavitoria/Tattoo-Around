describe('Página inicial', () => {
    it('deve carregar corretamente', () => {
      cy.visit('/');
      cy.contains('Bem-vindo ao Tattoo Around').should('be.visible');
      // Altere conforme necessário
    });
  });
  