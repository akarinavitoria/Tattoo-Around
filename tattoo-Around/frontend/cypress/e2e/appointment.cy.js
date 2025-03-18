describe('Agendamentos', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:5000/api/auth/login', {
      email: 'teste@teste.com',
      password: 'Mustang75!'
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });

    cy.visit('/profile'); // Vai direto para a página esperada
    cy.url().should('include', '/profile');
  });

  it('deve criar um agendamento com dados válidos', () => {
    cy.visit('/appointments');

    cy.get('input[name="appointmentDate"]').should('be.visible').type('2025-03-01T15:00');
    cy.get('select[name="service"]').should('be.visible').select('Tatuagem Tradicional');
    cy.get('textarea[name="notes"]').should('be.visible').type('Primeira sessão de tatuagem');

    cy.get('button[type="submit"]').should('be.enabled').click();

    // Verifica se o alerta de sucesso foi exibido
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Agendamento criado com sucesso');
    });
  });
});

