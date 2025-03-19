describe("Agendamentos", () => {
  beforeEach(() => {
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
    cy.url().should("include", "/appointments");
  });

  it("deve criar um agendamento com dados válidos", () => {
    cy.intercept("POST", "http://localhost:5000/api/appointments", {
      statusCode: 201,
      body: {
        id: 1,
        date: "2023-12-15T14:00",
        service: "Consulta inicial",
        status: "confirmed",
      },
    }).as("createAppointment");

    cy.wait(500);

    cy.get("[data-cy=date-picker]").should("be.visible").type("2023-12-15T14:00");
    cy.get("[data-cy=service-select]").should("be.visible").select("Consulta inicial");
    cy.get("[data-cy=submit-appointment]").should("be.visible").click();

    cy.wait("@createAppointment").its("response.statusCode").should("eq", 201);

    // Aguarda a mensagem de sucesso aparecer
    cy.contains("Agendamento criado com sucesso", { timeout: 5000 }).should("be.visible");
  });
});
