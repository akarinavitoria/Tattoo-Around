describe('Página inicial', () => {
    it('deve carregar corretamente', () => {
      cy.visit('/');
      cy.contains('TattooAround').should('be.visible');
      // Altere conforme necessário
    });
  });
  