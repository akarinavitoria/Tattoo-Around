describe("Signup Page", () => {
    beforeEach(() => {
      cy.visit("/signup");
      cy.wait(1000); // Aguarda 1 segundo para a página carregar
    });
  
    it("should display validation errors for empty fields", () => {
      cy.get("button[type=submit]").should("be.visible").click();
      cy.contains("Nome é obrigatório").should("be.visible");
      cy.contains("Email é obrigatório").should("be.visible");
      cy.contains("Senha é obrigatória").should("be.visible");
    });
  
    it("should show error for invalid email", () => {
      cy.get("[data-testid='signup-email']").should("be.visible").type("invalidemail");
      cy.get("button[type=submit]").click();
      cy.contains("Email inválido").should("be.visible");
    });
  
    it("should show error for mismatched passwords", () => {
      cy.get("[data-testid='signup-password']").should("be.visible").type("password123");
      cy.get("[data-testid='signup-confirmPassword']").should("be.visible").type("differentPassword");
      cy.get("button[type=submit]").click();
      cy.contains("As senhas não coincidem").should("be.visible");
    });
  
    it("should successfully sign up when all fields are valid", () => {
      cy.get("[data-testid='signup-name']").should("be.visible").type("Usuário Teste");
      cy.get("[data-testid='signup-email']").should("be.visible").type("usuario@teste.com");
      cy.get("[data-testid='signup-password']").should("be.visible").type("password123");
      cy.get("[data-testid='signup-confirmPassword']").should("be.visible").type("password123");
      cy.get("button[type=submit]").should("be.enabled").click();
      
      // Aguarda redirecionamento para a página de perfil
      cy.wait(); 
      cy.url().should("include", "/profile");
    });
  });
  