describe('Fluxo de Login', () => {
  it('deve logar com credenciais válidas', () => {
    cy.visit('/login'); // Acesse a página de login

    // Preencha os campos com as credenciais esperadas (de acordo com Login.jsx)
    cy.get('input[name="email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[name="password"]').type('123456');

    // Clique no botão de envio do formulário
    cy.get('button[type="submit"]').click();

    // Aguarde até que a URL contenha '/profile'
    cy.url().should('include', '/profile');

    // Aguarde um pouco para garantir que a página de perfil seja renderizada completamente
    cy.wait(2000);

    // Verifica se a página de perfil exibe o nome "Usuário Teste"
    cy.contains('Usuário Teste').should('be.visible');
  });

  it('deve exibir mensagem de erro com credenciais inválidas', () => {
    cy.visit('/login');

    // Use credenciais inválidas
    cy.get('input[name="email"]', { timeout: 10000 }).type('invalido@example.com');
    cy.get('input[name="password"]').type('senhaErrada');

    // Clique no botão de envio do formulário
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro aparece na tela
    cy.contains('Email ou senha inválidos').should('be.visible');
  });
});
