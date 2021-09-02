describe("Login Tests", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  it.skip("Get login page and login with non-existent user", () => {
    cy.visit("");
    cy.url().should("include", "/signin");
    console.log("Hello World");

    // login with a non-existent user
    cy.get("h1").should("be.visible").and("contain", "Sign in");
    cy.get("#username").type("DummyFirstName");
    cy.get("#password").type("hello");
    cy.get("[data-test='signin-submit']").click();
    // check for error message
    cy.contains("Username or password is invalid").should("be.visible");
  });

  it("Create a new account and login", () => {
    cy.visit("/");
    cy.get("h1").should("be.visible").and("contain", "Sign in");
    cy.get("[data-test='signup']").click();

    // Did it redirect to signup page
    cy.url().should("include", "/signup");
    cy.get("#firstName").type("Pallavi");
    cy.get("#lastName").type("Ramam");
    cy.get("#username").type("pramam");
    cy.get("#password").type("helloworld#");
    cy.get("#confirmPassword").type("helloworld#");
    cy.get("[data-test='signup-submit']").click();

    // It should redirect you to /signin page
    cy.url().should("include", "/signin");

    // Login with user just created
    cy.get("h1").should("be.visible").and("contain", "Sign in");
    cy.get("#username").type("pramam");
    cy.get("#password").type("helloworld#");
    cy.get("[data-test='signin-submit']").click();

    cy.contains("Get Started with Real World App").should("be.visible");
    cy.get("button[data-test='user-onboarding-next']").click();

    // Create Bank Account
    cy.contains("Create Bank Account").should("be.visible");
    cy.get("#bankaccount-bankName-input").type("Bank of America");
    cy.get("#bankaccount-routingNumber-input").type("123456789");
    cy.get("#bankaccount-accountNumber-input").type("111111111");
    // inspect shows "Save", form shows "SAVE"
    cy.get("[data-test='bankaccount-submit']").contains(/Save/i).click();

    cy.get("h2").should("be.visible").contains("Finished");
    cy.get("button[data-test='user-onboarding-next']").contains(/Done/i).click();

    // Make sure user's home page is displayed
    cy.contains("@pramam").should("be.visible");
  });
});
