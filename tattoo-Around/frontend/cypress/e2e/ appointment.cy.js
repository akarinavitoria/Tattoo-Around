describe('Agendamentos', () => {
  beforeEach(() => {
    // Realiza login com as credenciais corretas
    cy.visit('/login');
    cy.get('input[name="email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    // Verifica que após o login, a URL inclui "/profile"
    cy.url().should('include', '/profile');
  });

  it('deve criar um agendamento com dados válidos', () => {
    // Intercepta o alerta para verificar sua mensagem
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Agendamento criado com sucesso');
    });

    // Acesse a página de agendamentos
    cy.visit('/appointments');

    // Preencha os campos do formulário de agendamento
    cy.get('input[name="appointmentDate"]').type('2025-03-01T15:00');
    cy.get('select[name="service"]').select('Tatuagem Tradicional');
    cy.get('textarea[name="notes"]').type('Primeira sessão de tatuagem');

    // Clique no botão de submit
    cy.get('button[type="submit"]').click();
    
    // Não precisamos de cy.contains aqui, pois o alert é capturado via evento.
  });
});
