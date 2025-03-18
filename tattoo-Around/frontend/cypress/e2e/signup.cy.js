describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup")
  })

  it("should display validation errors for empty fields", () => {
    // Clicar no botão de cadastro sem preencher os campos
    cy.get('button[type="submit"]').click()

    // Verificar se as mensagens de erro aparecem
    // Ajustando os seletores para corresponder à sua implementação atual
    cy.get(".error-message").should("exist")
    cy.contains("Nome é obrigatório").should("be.visible")
  })

  it("should show error for invalid email", () => {
    // Preencher o campo de email com um valor inválido
    cy.get("#name").type("Usuário Teste")
    cy.get("#email").type("email-invalido")
    cy.get("#password").type("123456")
    cy.get("#confirmPassword").type("123456")
    cy.get("#agreeTerms").check()

    // Clicar no botão de cadastro
    cy.get('button[type="submit"]').click()

    // Verificar se a mensagem de erro de email inválido aparece
    cy.contains("Email inválido").should("be.visible")
  })

  it("should successfully sign up when all fields are valid", () => {
    // Interceptar a requisição de cadastro
    cy.intercept("POST", "**/api/auth/register", {
      statusCode: 201,
      body: {
        user: {
          id: 1,
          name: "Usuário Teste",
          email: "teste@teste.com",
        },
        token: "fake-jwt-token",
      },
    }).as("signupRequest")

    // Preencher todos os campos corretamente
    cy.get("#name").type("Usuário Teste")
    cy.get("#email").type("teste@teste.com")
    cy.get("#password").type("123456")
    cy.get("#confirmPassword").type("123456")

    // Selecionar o tipo de usuário (cliente)
    cy.get(".user-type-option").first().click()

    // Marcar o checkbox de termos
    cy.get("#agreeTerms").check()

    // Clicar no botão de cadastro
    cy.get('button[type="submit"]').click()

    // Verificar se o redirecionamento ocorre
    // Adicionando um timeout maior para dar tempo ao redirecionamento
    cy.url().should("include", "/profile", { timeout: 10000 })
  })
})




