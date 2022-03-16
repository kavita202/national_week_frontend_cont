context("Network Requests", () => {
  it("cy.request() with query parameters", () => {
    cy.request(`${Cypress.env("API_URL")}/questions?topic=Javascript`).should(
      ({ body, status }) => {
        expect(status).to.eq(200);
        expect(body).to.be.a("object").and.to.contain({ success: true });
        expect(body.payload).to.be.a("array");
        expect(body.message).to.contain("Javascript");
      }
    );
  });
});

context(
  'should response with a message of "score successfully added" for adding a users score',
  () => {
    it("should login", () => {
      cy.login()
        .then(() => {
          cy.request("POST", `${Cypress.env("API_URL")}/progress/new`, {
            userId: Cypress.env("auth0UserId"),
            topic: "Javascript",
            score: 10,
          });
        })
        .then((response) => {
          expect(response).property("status").to.equal(200);
          expect(response).property("body").to.contain({
            message: "score successfully added",
          });
          expect(response.body).property("payload").to.be.a("array");
        });
    });
  }
);
