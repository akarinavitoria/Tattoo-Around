describe('Fluxo de Login', () => {
  beforeEach(() => {
    // Intercepta a chamada POST para o login, simulando uma resposta bem-sucedida.
    cy.intercept('POST', '/api/v1/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-token',
        data: {
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com",
          profilePic: "/placeholder.svg?height=200&width=200",
        },
      },
    }).as('loginRequest');
  });

  it('deve logar com credenciais válidas', () => {
    cy.visit('/login'); // Acesse a página de login

    // Preencha os campos de email e senha com as credenciais corretas
    cy.get('input[name="email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[name="password"]').type('123456');

    // Clique no botão de envio do formulário
    cy.get('button[type="submit"]').click();

    // Aguarde a resposta simulada
    cy.wait('@loginRequest');

    // Verifique se a URL inclui o caminho esperado após o login (neste caso, /profile)
    cy.url().should('include', '/profile');

    // Verifique se o Header exibe a saudação (por exemplo, "Olá,")
    cy.get('header').contains('Olá,');
  });

  it('deve exibir mensagem de erro com credenciais inválidas', () => {
    // Intercepta a chamada POST para login simulando erro de autenticação
    cy.intercept('POST', '/api/v1/auth/login', {
      statusCode: 401,
      body: {
        message: "Email ou senha inválidos",
      },
    }).as('loginFail');

    cy.visit('/login');

    // Use credenciais inválidas
    cy.get('input[name="email"]', { timeout: 10000 }).type('invalido@example.com');
    cy.get('input[name="password"]').type('senhaErrada');

    // Clique no botão de envio do formulário
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');

    // Verifica se a mensagem de erro aparece na tela
    cy.contains('Email ou senha inválidos').should('be.visible');
  });
});

