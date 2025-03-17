describe('Agendamentos', () => {
    // Se você tiver um comando customizado para login, pode usá-lo aqui
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('usuario@example.com');
      cy.get('input[name="password"]').type('senha123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/artist-profile');
    });
  
    it('deve criar um agendamento com dados válidos', () => {
      cy.visit('/appointments'); // Certifique-se de que essa rota existe
  
      // Preencha os campos do formulário de agendamento
      cy.get('input[name="appointmentDate"]').type('2025-03-01T15:00');
      cy.get('select[name="service"]').select('Tatuagem Tradicional');
      cy.get('textarea[name="notes"]').type('Primeira sessão de tatuagem');
      cy.get('button[type="submit"]').click();
  
      // Verifique se a mensagem de sucesso é exibida
      cy.contains('Agendamento criado com sucesso').should('be.visible');
    });
  });
  