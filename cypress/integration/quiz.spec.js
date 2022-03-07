context("Logged in user should be able to record result", () => {
  it("should login", () => {
    cy.login().then(() => {
      cy.visit("/topics");
      cy.url().should("include", "/topics");
      cy.get('div[id*="Javascript"]').click();
      cy.url().should("include", "/topics/Javascript");
      cy.get('[type="radio"]').check();
      cy.get("button[type=submit]").click();
      cy.contains("Show correct answers");
      cy.contains("Result saved");
      cy.request("/api/auth/me").then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env("auth0Username"));
      });
    });
  });
});

context("Logged out user should not be able to record result", () => {
  it("should navigate to a question page from the homepage and try to submit a quiz", () => {
    cy.logout().then(() => {
      cy.visit("/topics");
      cy.url().should("include", "/topics");
      cy.get('div[id*="CSS"]').click();
      cy.url().should("include", "/topics/CSS");
      cy.get('[type="radio"]').check();
      cy.get("button[type=submit]").click();
      cy.contains("Reattempt");
      cy.get("button").contains("Record result").click();
      cy.contains("Please sign in to track your progress");
    });
  });
});
context("User should be able to reattempt quiz", () => {
  it("should allow user to check answers, submit, reattempt, return to question page and submit", () => {
    cy.visit("/topics");
    cy.url().should("include", "/topics");
    cy.get('div[id*="Databases"]').click();
    cy.url().should("include", "/topics/Databases");
    cy.get('[type="radio"]').check();
    cy.get("button[type=submit]").click();
    cy.get("button").contains("Reattempt").click();
    cy.contains('div[class*="ant-space-item"]');
    cy.contains("Databases");
    cy.get("button[type=submit]").click();
    cy.get("button").contains("Reattempt").click();
  });
});

describe("Submit quiz without inputting answers", () => {
  it("should navigate to a question page from the homepage and try to submit without answering questions", () => {
    cy.visit("/");
    cy.get('a[href*="/topics"]').click();
    cy.url().should("include", "/topics");
    cy.get("h3").contains("CSS");
    cy.contains("Javascript");
    cy.get('div[id*="Javascript"]').click();
    cy.url().should("include", "/topics/Javascript");
    cy.get("button[type=submit]").click();
    cy.contains("Please select an answer");
  });
});
describe("Click show correct answers and see colour change", () => {
  it("should change to color of 10 radio button answers from black to green", () => {
    cy.visit("/topics");
    cy.get('div[id*="Javascript"]').click();
    cy.url().should("include", "/topics/Javascript");
    cy.get('div[class*="QuestionBox"]').should("have.length", 10);
    cy.get('label[class*="ant-radio-wrapper"]')
      .not('[style*="font-weight: 600; color: green;"]')
      .should("have.css", "color", "rgba(0, 0, 0, 0.85)");
    cy.get('[type="radio"]').check();
    cy.get("button[type=submit]").click();
    cy.get("button").contains("Show correct answers").click();
    cy.get('label[style*="font-weight: 600; color: green;"]').should(
      "have.length",
      10
    );
  });
});
