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
    it("product results", () => {
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

    it("selected product", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });

      cy.get('input[placeholder="Искать на Ozon"]').type("Ноутбук HP{enter}");

      cy.get(".x2.x7.x9.q1j_23", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );

      cy.get(".x2.x7.x9.q1j_23").first().should("be.visible").click();

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
      cy.get(".kaa0_33").should("be.visible");
    });
  });
  describe("Проверка на добавление в корзину", () => {
    it("product cart", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
      cy.get('input[placeholder="Искать на Ozon"]').type("Ноутбук HP{enter}");
      cy.get(".x2.x7.x9.q1j_23", { timeout: 10000 }).first().click();
      cy.wait(2000);
      cy.get(".wk_27.b2117-a0.b2117-b2.b2117-a4", { timeout: 10000 })
        .first()
        .should("be.visible")
        .should("not.be.disabled")
        .click({ force: true });
      cy.get(".a6.p6d_4_9").first().click();
      cy.wait(2000);
    });
  });
  describe("Добавить товар в избранные", () => {
    it("product like", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });

      cy.get('input[placeholder="Искать на Ozon"]').type("Ноутбук HP{enter}");

      cy.get(".x2.x7.x9.q1j_23").first().click();

      cy.wait(2000);
      cy.get(".w5k_27.ag018-a0.ag018-a3")
        .first()
        .click({ force: true });

      cy.get(".a6.p6d_16_9").first().click();

      cy.get(".s2j_23.s3j_23.tile-root", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );
    });
  });
  describe("Проверка на страницы, стать продавцом", () => {
    it("product site", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
      cy.visit("https://seller.ozon.ru/", { failOnStatusCode: false });
      cy.get(".a4j_2.ja4_2", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );
    });
  });
  describe("Проверка на заполненость страницы, ", () => {
    it("product site", () => {
      cy.visit("https://www.ozon.ru/", { failOnStatusCode: false });
      cy.wait(2000);
      cy.get(".b2117-a0.b2117-b5").first().click();
      cy.wait(2000);
      cy.visit("https://www.ozon.ru/category/sport-i-otdyh-11000/", { failOnStatusCode: false });
      cy.get(".e3a", { timeout: 10000 }).should(
        "have.length.greaterThan",
        0
      );
    });
  });
  
});
