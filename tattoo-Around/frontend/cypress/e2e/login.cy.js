describe("Fluxo de Login", () => {
  it("deve logar com credenciais válidas", () => {
    cy.visit("/login");

    cy.get('[data-testid="login-email"]').type("teste@teste.com");
    cy.get('[data-testid="login-password"]').type("123456");
    cy.get('[data-testid="login-submit"]').click();

    // Aguarde até que a URL contenha "/profile"
    cy.url().should("include", "/profile");
  });
});
