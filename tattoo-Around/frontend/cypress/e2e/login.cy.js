describe("Fluxo de Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("deve logar com credenciais válidas", () => {
    cy.get('[data-testid="login-email"]').type("teste@teste.com");
    cy.get('[data-testid="login-password"]').type("123456");
    cy.get('[data-testid="login-submit"]').click();

    // Espera explícita para garantir que o login seja processado
    cy.url().should("include", "/profile");

    // Aguarda a exibição do nome do usuário
    cy.contains("Usuário Teste", { timeout: 10000 }).should("be.visible");
  });

  it("deve exibir mensagem de erro com credenciais inválidas", () => {
    cy.get('[data-testid="login-email"]').type("email@errado.com");
    cy.get('[data-testid="login-password"]').type("senhaerrada");
    cy.get('[data-testid="login-submit"]').click();

    cy.get('[data-testid="login-error"]')
      .should("be.visible")
      .and("contain", "Email ou senha inválidos");
  });
});
describe("Fluxo de Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("deve logar com credenciais válidas", () => {
    cy.get('[name="email"]').type("teste@teste.com");
    cy.get('[name="password"]').type("123456");
    cy.get("button[type='submit']").click();

    // Aguarda o redirecionamento para o perfil
    cy.url().should("include", "/profile");

    // Aguarda a exibição do nome do usuário no perfil
    cy.contains("Usuário Teste", { timeout: 10000 }).should("be.visible");
  });
});
