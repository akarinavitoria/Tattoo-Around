describe('Página inicial', () => {
    it('deve carregar corretamente', () => {
      cy.visit('/');
      cy.contains('Tattoo Around'); // Altere conforme necessário
    });
  });
  