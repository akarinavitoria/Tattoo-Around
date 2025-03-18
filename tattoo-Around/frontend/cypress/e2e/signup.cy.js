describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup");
    cy.wait(2000); // Tempo extra para carregar todos os elementos
  });

  it("should display validation errors for empty fields", () => {
    cy.get('*').then(console.log); // Mostra todos os elementos carregados
    cy.get("button[type=submit]").should('exist').should('be.visible').click();
    
    cy.contains("Nome é obrigatório").should("be.visible");
    cy.contains("Email é obrigatório").should("be.visible");
    cy.contains("Senha é obrigatória").should("be.visible");
  });

  it("should show error for invalid email", () => {
    cy.get("input[name=email]").should('exist').should('be.visible').type("invalidemail");
    cy.get("button[type=submit]").click();
    cy.contains("Email inválido").should("be.visible");
  });

  it("should successfully sign up when all fields are valid", () => {
    cy.get("input[name=name]").should('exist').should('be.visible').type("Usuário Teste");
    cy.get("input[name=email]").should('exist').should('be.visible').type("usuario@teste.com");
    cy.get("input[name=password]").should('exist').should('be.visible').type("password123");
    cy.get("input[name=confirmPassword]").should('exist').should('be.visible').type("password123");
    
    cy.get("button[type=submit]").should('exist').should('be.enabled').click();
    cy.debug(); // Para pausar a execução e inspecionar o estado da página

    cy.url().should("include", "/profile");
  });
});


