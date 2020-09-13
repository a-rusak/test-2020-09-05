import buttons from "../../../src/config/calculator-buttons";

beforeEach(() => {
  cy.visit("/");
});

describe("Calculator", () => {
  it("Initial state", () => {
    cy.contains('form[name="calculator"]', "0  1  2  3  4  5  6  7  8  9");
    cy.get('[data-cy="buffer"]').should("have.value", "");
    cy.contains("output", "0");
  });
  it("sum 2+2 by pressing calc buttons and show result", () => {
    cy.get('button[name="two"]').click();
    cy.get('button[name="plus"]').click();
    cy.get('button[name="two"]').click();
    cy.contains('[data-cy="buffer"]', " 2 + 2");
    cy.get('button[name="apply"]').click();
    cy.contains('[data-cy="buffer"]', "4");
    cy.contains("output", "4");
  });
  it("sum 2+2 by typing on keyboard and show result", () => {
    cy.get("body").type("2");
    cy.contains('[data-cy="buffer"]', "2");
    cy.get("body").type("+");
    cy.contains('[data-cy="buffer"]', "2 +");
    cy.get("body").type("2");
    cy.contains('[data-cy="buffer"]', "2 + 2");
    cy.get("body").type("=");
    cy.contains('[data-cy="buffer"]', "4");
    cy.contains("output", "4");
  });
  it("monkey test", () => {
    buttons.forEach(({ name }) => {
      cy.get(`button[name="${name}"]`).click();
      cy.get('button[name="apply"]').click();
    });
    cy.contains("output", "0");
  });
});
