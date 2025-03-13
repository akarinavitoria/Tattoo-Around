describe('Página inicial', () => {
    it('deve carregar corretamente', () => {
      cy.visit('/');
      cy.contains('Bem Vindo!! Aqui você encontra os melhores tatuadores perto de você').should('be.visible');
      // Altere conforme necessário
    });
  });
  