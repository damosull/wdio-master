import LoginPage from "../page-objects/loginPage.js";
import ShopPage from "../page-objects/shopPage.js";
import ReviewPage from "../page-objects/reviewPage.js";
import DeliveryPage from "../page-objects/deliverPage.js";
import { expect } from "chai";

// Data Driven - Parameterise test cases using Mocha Framework & JSON files - Part 2

// Here, we're going to see how to deal with nested arrays.
// We're going to create a JSON file that contains different combinations of product names.
// Then based on the JSON array, we'll loop through the test case & use the products in the JSON to populate our tests

// 1. Same as before, import the JSON file:
import fs from "fs";
let productChoices = JSON.parse(
  fs.readFileSync("test/test-data/product-choices.json")
);

describe("Data Driven - Parameterise test cases using Mocha Framework & JSON files - Part 2", async () => {
  productChoices.forEach(({ products }) => {
    it("Data Driven - Parameterise test cases using Mocha Framework & JSON files - Part 2", async () => {
      // 2. We've removed the hard-coded products below & are instead using the products we specified in the JSON
      // const products = ["iphone X", "Blackberry"];

      // Sign in with POM
      await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
      await LoginPage.login("rahulshettyacademy", "learning");
      await ShopPage.checkout.waitForExist();
      await ShopPage.addProductToCart(products);
      await ShopPage.checkout.click();

      // Review page
      let sumOfProducts = await ReviewPage.sumOfProducts();
      let totalIntValue = await ReviewPage.totalFormattedPrice();
      await expect(sumOfProducts).to.equal(totalIntValue);
      await ReviewPage.btnCheckout.click();

      // Delivery page
      await DeliveryPage.txtLocation.setValue("Ind");
      await DeliveryPage.selectCountry("India");
      await DeliveryPage.btnPurchase.click();
      const alertText = await DeliveryPage.message.getText();
      await expect(alertText).to.include("Success");
    });
  });
});
