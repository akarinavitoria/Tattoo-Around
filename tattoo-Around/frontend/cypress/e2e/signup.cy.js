describe("Fluxo de Cadastro", () => {
    beforeEach(() => {
      cy.visit("/signup");
    });
  
    it("deve cadastrar um usuário com sucesso", () => {
      cy.get("[id=name]").type("Usuário Teste");
      cy.get("[id=email]").type("teste@teste.com");
      cy.get("[id=password]").type("123456");
      cy.get("[id=confirmPassword]").type("123456");
      cy.get("button[type=submit]").click();
  
      cy.url().should("include", "/profile");
    });
  
    it("deve exibir erro ao tentar cadastrar com senhas diferentes", () => {
      cy.get("[id=password]").type("123456");
      cy.get("[id=confirmPassword]").type("654321");
      cy.get("button[type=submit]").click();
  
      cy.contains("As senhas não coincidem!").should("be.visible");
    });
  });
  