context("Logging in", () => {
  it("should login", () => {
    cy.login().then(() => {
      // Now run your test...
      cy.request("/api/auth/me").then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env("auth0Username"));
      });
    });
  });
});

context("Logging out", () => {
  it("should logout", () => {
    cy.login().then(() => {
      cy.visit("/");

      cy.request("/api/auth/me").then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env("auth0Username"));
      });

      cy.logout();

      cy.request({
        url: "/api/auth/me",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401); // Assert user is logged out
      });
    });
  });
});
