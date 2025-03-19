describe("Agendamentos", () => {
  beforeEach(() => {
    // Define o usuário e token no localStorage antes de carregar a página
    cy.visit("/appointments", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("user", JSON.stringify({
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com"
        }));
        win.localStorage.setItem("token", "fake-jwt-token");
      }
    });
    // Verifica se a URL permanece em /appointments (sem redirecionamento para /login)
    cy.url().should("include", "/appointments");
  });

  it("deve criar um agendamento com dados válidos", () => {
    // Intercepta a requisição de criação de agendamento e simula sucesso
    cy.intercept("POST", "http://localhost:5000/api/appointments", {
      statusCode: 201,
      body: {
        id: 1,
        date: "2023-12-15",
        time: "14:00",
        service: "Consulta inicial",
        status: "confirmed",
      },
    }).as("createAppointment");

    // Aguarda que o formulário esteja renderizado
    cy.wait(500);

    // Preenche o formulário usando os seletores (confirme que os componentes têm esses atributos)\n
    cy.get("[data-cy=date-picker]").should("be.visible").type("2023-12-15");
    cy.get("[data-cy=time-picker]").should("be.visible").select("14:00");
    cy.get("[data-cy=service-select]").should("be.visible").select("Consulta inicial");
    cy.get("[data-cy=submit-appointment]").should("be.visible").click();

    // Aguarda a resposta da requisição simulada
    cy.wait("@createAppointment").its("response.statusCode").should("eq", 201);

    // Verifica se a mensagem de sucesso aparece
    cy.contains("Agendamento criado com sucesso").should("be.visible");
  });
});
