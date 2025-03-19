describe("Agendamentos", () => {
  beforeEach(() => {
    // Mockar login para evitar chamadas reais ao backend
    cy.intercept("POST", "http://localhost:5000/api/auth/login", {
      statusCode: 200,
      body: {
        token: "fake-jwt-token",
        user: {
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com",
        },
      },
    }).as("loginRequest");

    // Simular usuário logado no localStorage
    cy.window().then((win) => {
      win.localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com",
        })
      );
      win.localStorage.setItem("token", "fake-jwt-token");
    });

    // Visitar a página de agendamentos
    cy.visit("/appointments");
  });

  it("deve criar um agendamento com dados válidos", () => {
    // Mock da requisição de criação de agendamento
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

    // Aguardar renderização dos elementos
    cy.wait(500);

    // Preencher o formulário de agendamento com verificações adicionais
    cy.get("[data-cy=date-picker]").should("be.visible").click().type("2023-12-15");
    cy.get("[data-cy=time-picker]").should("be.visible").select("14:00");
    cy.get("[data-cy=service-select]").should("be.visible").select("Consulta inicial");
    cy.get("[data-cy=submit-appointment]").should("be.visible").click();

    // Verificar se a requisição foi enviada
    cy.wait("@createAppointment").its("response.statusCode").should("eq", 201);

    // Verificar se a mensagem de sucesso apareceu
    cy.contains("Agendamento criado com sucesso").should("be.visible");
  });
});
