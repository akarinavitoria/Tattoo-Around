describe("Fluxo de Cadastro", () => {
    it("deve cadastrar um usuário com credenciais válidas", () => {
      cy.visit("http://localhost:3000/register");
  
      cy.get("[data-testid='register-name']").type("Usuário Teste");
      cy.get("[data-testid='register-email']").type("teste@teste.com");
      cy.get("[data-testid='register-password']").type("123456");
  
      cy.get("[data-testid='register-submit']").click();
  
      cy.url().should("include", "/login");
    });
  
    it("deve exibir mensagem de erro se o email já estiver cadastrado", () => {
      cy.visit("http://localhost:3000/register");
  
      cy.get("[data-testid='register-name']").type("Usuário Teste");
      cy.get("[data-testid='register-email']").type("teste@teste.com");
      cy.get("[data-testid='register-password']").type("123456");
  
      cy.get("[data-testid='register-submit']").click();
  
      cy.contains("Email já cadastrado").should("be.visible");
    });
  });
  