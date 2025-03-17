describe('Fluxo de Login', () => {
    it('deve logar com credenciais válidas', () => {
      cy.visit('/login'); // Acesse a página de login
  
      // Preencha os campos de email e senha
      cy.get('input[name="email"]').type('usuario@example.com');
      cy.get('input[name="password"]').type('senha123');
  
      // Clique no botão de envio do formulário
      cy.get('button[type="submit"]').click();
  
      // Verifique se a URL inclui o caminho esperado após o login (por exemplo, /artist-profile)
      cy.url().should('include', '/artist-profile');
  
      // Verifique se o Header exibe o nome do usuário (ajuste o seletor conforme necessário)
      cy.get('header').contains('Olá,');
    });
  
    it('deve exibir mensagem de erro com credenciais inválidas', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('invalido@example.com');
      cy.get('input[name="password"]').type('senhaErrada');
      cy.get('button[type="submit"]').click();
  
      // Verifica se uma mensagem de erro aparece na tela
      cy.contains('Credenciais inválidas').should('be.visible');
    });
  });
  