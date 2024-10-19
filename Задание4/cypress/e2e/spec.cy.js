describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
    cy.intercept("POST", "https://events.backtrace.io/**", {
      statusCode: 200,
    }).as("backtrace");
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (
      err.message.includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      return false;
    }
  });
  describe("Поиск продукта", () => {
    it("product and display results", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
      cy.get('input[placeholder="Искать на Ozon"]').type("ноутбук{enter}");

      cy.get(".widget-search-result-container").should("be.visible");
      cy.contains("Ноутбук").should("exist");
    });
  });
  describe("Информация о Товаре(в карточке)", () => {
    beforeEach(() => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    });

    it("should display information for a selected product", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });

      cy.get('input[placeholder="Искать на Ozon"]').type("Ноутбук HP{enter}");

      cy.get(".x2.x7.x9.p5j_23", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );

      cy.get(".x2.x7.x9.p5j_23").first().should("be.visible").click();

      cy.url().should("include", "/product");
      cy.get("h1", { timeout: 10000 }).should("exist").and("not.be.empty");
    });
  });
  describe("Проверка на товар, который несуществует", () => {
    it("show product", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
      cy.get('input[placeholder="Искать на Ozon"]').type(
        "НеправильныйТовар{enter}"
      );
      cy.get(".iaa4_32").should("be.visible");
    });
  });
  describe("Проверка на добавление в корзину", () => {
    it("product to the cart", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
      cy.get('input[placeholder="Искать на Ozon"]').type("Ноутбук HP{enter}");
      cy.get(".x2.x7.x9.p5j_23", { timeout: 10000 }).first().click();
      cy.wait(2000);
      cy.get(".v4k_27.b2115-a0.b2115-b2.b2115-a4", { timeout: 10000 })
        .first()
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.get(".a6.dp2_4_9").first().click();
      cy.wait(2000);
    });
  });
  describe("Добавить товар в избранные", () => {
    it("should add a product to the wishlist", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });

      cy.get('input[placeholder="Искать на Ozon"]').type("Ноутбук HP{enter}");

      cy.get(".x2.x7.x9.p5j_23").first().click();

      cy.wait(2000);
      cy.get(".k0w_27.ag017-a0.ag017-a3")
        .first()
        .should("be.visible")
        .click({ force: true });

      cy.get(".a6.p0d_16_9").first().click();

      cy.get(".r6j_23.r7j_23.tile-root", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );
    });
  });
});
