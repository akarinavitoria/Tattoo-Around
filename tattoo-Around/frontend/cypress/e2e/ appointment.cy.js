describe('Agendamentos', () => {
  beforeEach(() => {
    // Intercepta login
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

    cy.visit('/login');
    cy.get('input[name="email"]', { timeout: 10000 }).type('teste@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest');
    cy.url().should('include', '/profile');
  });

  it('deve criar um agendamento com dados válidos', () => {
    // Intercepta a criação do agendamento
    cy.intercept('POST', '/api/v1/appointments', {
      statusCode: 201,
      body: {
        success: true,
        data: { /* dados simulados do agendamento */ },
      },
    }).as('createAppointment');

    cy.visit('/appointments');
    cy.get('input[name="appointmentDate"]').type('2025-03-01T15:00');
    cy.get('select[name="service"]').select('Tatuagem Tradicional');
    cy.get('textarea[name="notes"]').type('Primeira sessão de tatuagem');
    cy.get('button[type="submit"]').click();
    cy.wait('@createAppointment');
    cy.contains('Agendamento criado com sucesso').should('be.visible');
  });
});
