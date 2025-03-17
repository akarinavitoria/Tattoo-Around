describe('Agendamentos', () => {
  beforeEach(() => {
    // Login usando credenciais válidas antes de cada teste
    cy.visit('/login');
    cy.get('input[name="email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    // Verifica se o login redirecionou para a página de perfil
    cy.url().should('include', '/profile');
  });

  it('deve criar um agendamento com dados válidos', () => {
    // Acesse a página de agendamentos
    cy.visit('/appointments');

    // Preencha o formulário de agendamento
    cy.get('input[name="appointmentDate"]').type('2025-03-01T15:00');
    cy.get('select[name="service"]').select('Tatuagem Tradicional');
    cy.get('textarea[name="notes"]').type('Primeira sessão de tatuagem');

    // Submeta o formulário
    cy.get('button[type="submit"]').click();

    // Verifique se uma mensagem de sucesso é exibida
    cy.contains('Agendamento criado com sucesso').should('be.visible');
  });
});
