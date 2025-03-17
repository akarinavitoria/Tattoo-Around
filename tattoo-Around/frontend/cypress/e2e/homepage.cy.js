describe('Página Inicial', () => {
  it('deve exibir o logo no Header', () => {
    cy.visit('/');
    // Procura o elemento <a> com a classe "logo" que deve conter o texto "Tattoo Around"
    cy.get('a.logo', { timeout: 15000 }).should('contain.text', 'Tattoo Around');
  });
});

  