describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    cy.intercept("POST", "https://events.backtrace.io/**", {
      statusCode: 200,
    }).as("backtrace");
  });
  it("passes", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
  });
  it("filter", () => {
    // Логин
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();

    cy.get(".product_sort_container")
      .children("option")
      .should("have.length", 4)
      .eq(2)
      .should("have.value", "lohi");
    cy.get(".product_sort_container").select("lohi");

    let lastPriceLoHi = 0.0;
    cy.get('.inventory_item[data-test="inventory-item"]').each((el) => {
      cy.wrap(el)
        .find('.inventory_item_price[data-test="inventory-item-price"]')
        .invoke("text")
        .then((priceText) => {
          const price = parseFloat(priceText.replace("$", ""));

          cy.log(`Price: ${price}`);
          cy.log(`Last Price: ${lastPriceLoHi}`);

          expect(price).to.be.at.least(lastPriceLoHi);
          lastPriceLoHi = price;
        });
    });

    cy.get(".product_sort_container")
      .children("option")
      .should("have.length", 4)
      .eq(3)
      .should("have.value", "hilo");
    cy.get(".product_sort_container").select("hilo");

    let lastPriceHiLo = Number.MAX_VALUE;
    cy.get('.inventory_item[data-test="inventory-item"]').each((el) => {
      cy.wrap(el)
        .find('.inventory_item_price[data-test="inventory-item-price"]')
        .invoke("text")
        .then((priceText) => {
          const price = parseFloat(priceText.replace("$", ""));

          cy.log(`Price: ${price}`);
          cy.log(`Last Price: ${lastPriceHiLo}`);

          expect(price).to.be.at.most(lastPriceHiLo);
          lastPriceHiLo = price;
        });
    });
  });
  it("zakaz", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();

    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get("#add-to-cart-sauce-labs-fleece-jacket").click();
    cy.get("#shopping_cart_container").click();
    cy.get("#checkout").click();
    cy.get("#first-name").type("Maxim");
    cy.get("#last-name").type("Bandukov");
    cy.get("#postal-code").type("123123");
    cy.get("#continue").click();
    cy.get("#finish").click();
    cy.get("#back-to-products").click();
  });
});
