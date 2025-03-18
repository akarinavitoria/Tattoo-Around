describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
    cy.wait(1000); // Dá um tempo para a página carregar completamente
  });

  it("should display validation errors for empty fields", () => {
    cy.get("button[type=submit]").should('be.visible').click();
    cy.contains("Nome é obrigatório").should("be.visible");
    cy.contains("Email é obrigatório").should("be.visible");
    cy.contains("Senha é obrigatória").should("be.visible");
  });

  it("should show error for invalid email", () => {
    cy.get("input[name=email]").should('be.visible').type("invalidemail");
    cy.get("button[type=submit]").click();
    cy.contains("Email inválido").should("be.visible");
  });

  it("should show error for mismatched passwords", () => {
    cy.get("input[name=password]").should('be.visible').type("password123");
    cy.get("input[name=confirmPassword]").should('be.visible').type("differentPassword");
    cy.get("button[type=submit]").click();
    cy.contains("As senhas não coincidem").should("be.visible");
  });

  it("should successfully sign up when all fields are valid", () => {
    cy.get("input[name=name]").should('be.visible').type("Usuário Teste");
    cy.get("input[name=email]").should('be.visible').type("usuario@teste.com");
    cy.get("input[name=password]").should('be.visible').type("password123");
    cy.get("input[name=confirmPassword]").should('be.visible').type("password123");
    cy.get("button[type=submit]").should('be.enabled').click();
    
    cy.url().should("include", "/profile");
  });
});

