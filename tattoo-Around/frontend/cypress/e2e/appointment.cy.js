escribe("Agendamentos", () => {
  beforeEach(() => {
    // Em vez de fazer uma requisição real para o backend, vamos mockar o login
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
    }).as("loginRequest")

    // Configurar localStorage para simular usuário logado
    cy.window().then((win) => {
      win.localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com",
        }),
      )
      win.localStorage.setItem("token", "fake-jwt-token")
    })

    // Visitar a página de agendamentos
    cy.visit("/appointments")
  })

  it("deve criar um agendamento com dados válidos", () => {
    // Interceptar a requisição de criação de agendamento
    cy.intercept("POST", "http://localhost:5000/api/appointments", {
      statusCode: 201,
      body: {
        id: 1,
        date: "2023-12-15",
        time: "14:00",
        service: "Consulta inicial",
        status: "confirmed",
      },
    }).as("createAppointment")

    // Preencher o formulário de agendamento
    cy.get("[data-cy=date-picker]").type("2023-12-15")
    cy.get("[data-cy=time-picker]").select("14:00")
    cy.get("[data-cy=service-select]").select("Consulta inicial")
    cy.get("[data-cy=submit-appointment]").click()

    // Verificar se a requisição foi feita corretamente
    cy.wait("@createAppointment")

    // Verificar se a mensagem de sucesso aparece
    cy.contains("Agendamento criado com sucesso").should("be.visible")
  })
})


