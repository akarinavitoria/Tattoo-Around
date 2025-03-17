describe('Página Inicial', () => {
    it('deve exibir o logo no Header', () => {
      // Visita a página inicial, usando a baseUrl definida em cypress.config.js (por exemplo, http://localhost:3000)
      cy.visit('/');
  
      // Verifica se o elemento com a classe "logo" contém o texto "Tattoo Around"
      cy.get('logo', { timeout: 15000 }).should('contain.text', 'Tattoo Around');
    });
  });
  