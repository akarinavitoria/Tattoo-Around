describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should display validation errors for empty fields", () => {
    cy.get("button[type=submit]").click();
    cy.contains("Nome é obrigatório").should("be.visible");
    cy.contains("Email é obrigatório").should("be.visible");
    cy.contains("Senha é obrigatória").should("be.visible");
  });

  it("should show error for invalid email", () => {
    cy.get("input[name=email]").type("invalidemail");
    cy.get("button[type=submit]").click();
    cy.contains("Email inválido").should("be.visible");
  });

  it("should show error for mismatched passwords", () => {
    cy.get("input[name=password]").type("password123");
    cy.get("input[name=confirmPassword]").type("differentPassword");
    cy.get("button[type=submit]").click();
    cy.contains("As senhas não coincidem").should("be.visible");
  });

  it("should successfully sign up when all fields are valid", () => {
    cy.get("input[name=name]").type("Usuário Teste");
    cy.get("input[name=email]").type("usuario@teste.com");
    cy.get("input[name=password]").type("password123");
    cy.get("input[name=confirmPassword]").type("password123");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/profile");
  });
});
