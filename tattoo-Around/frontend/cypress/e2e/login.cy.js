describe('Fluxo de Login', () => {
  it('deve logar com credenciais válidas', () => {
    cy.visit('/login'); // Acesse a página de login

    // Preencha os campos com as credenciais esperadas (conforme Login.jsx)
    cy.get('input[name="email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[name="password"]').type('123456');

    // Clique no botão de envio do formulário
    cy.get('button[type="submit"]').click();

    // Verifique se, após o login, a URL inclui "/profile"
    cy.url().should('include', '/profile');

    // Opcional: Verifique se a página de perfil exibe algum dado do usuário
    cy.contains('Usuário Teste').should('be.visible');
  });

  it('deve exibir mensagem de erro com credenciais inválidas', () => {
    cy.visit('/login');

    // Use credenciais inválidas
    cy.get('input[name="email"]', { timeout: 10000 }).type('invalido@example.com');
    cy.get('input[name="password"]').type('senhaErrada');

    // Clique no botão de envio do formulário
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro aparece na tela (conforme Login.jsx)
    cy.contains('Email ou senha inválidos').should('be.visible');
  });
});

