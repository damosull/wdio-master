// Here we're going to develop an E2E WDIO framework
// We've already written tests in the previous files
// Now, We're going to take some of them & convert them to fit the standards for an E2E framework

// This will include the following:
// 01. Implement page object model design pattern
// 02. Parameterize the test cases using mocha
// 03. Perform do data-driven testing from JSON files
// 04. Use Capabilities to run tests in parallel & different browsers
// 05. Run specific tests using Mocha Grep options
// 06. Importance of Bail & Base URL options in the config file
// 07. Create test suites & controlling the execution with Command Line parameters
// 08. Build customized WDIO config file to run tests with different options & environments
// 09. Avoid flaky tests using the Retry mechanism in Mocha framework
// 10. Generate generate Allure report
// 11. Capture screenshots on test failures (using pre & post hooks) & attaching them to the Allure report
// 12. Integrate the framework with Jenkins for Continuous Integration

// 01. Implement page object model design pattern:
// Inside the `specs` folder, create `page-objects` folder. Now go to the POM file `loginPage.js`
// After creating the page object file, now it's time to use it to login:

// 1. Import the page object:
import LoginPage from "../specs/page-objects/loginPage.js";
import ShopPage from "../specs/page-objects/shopPage.js";
import ReviewPage from "../specs/page-objects/reviewPage.js";
import DeliveryPage from "../specs/page-objects/deliverPage.js";
import { expect } from "chai";

describe("E2E Framework", async () => {
  it("Login Test", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");

    // 2. Call the login() method you created in the page object & pass the user/password you want to use:
    await LoginPage.login("rahulshettyacademy", "learning1234");
    await console.log(await LoginPage.alert.getText());

    await browser.waitUntil(
      async () => (await LoginPage.signIn.getAttribute("value")) === "Sign In",
      {
        timeout: 5000,
        timeoutMsg: "Error message is not showing up",
      }
    );
    await console.log(await LoginPage.alert.getText());
    await expect(await LoginPage.textInfo).toHaveTextContaining(
      "username is rahulshettyacademy"
    );
  });

  // Next, we're going to implement POM on the eCommerce test
  // Create a shop page POM & copy test from `16_e2e_test_p2.js` here & then do the POM refactoring:

  it.only("eCommerce", async () => {
    const products = ["iphone X", "Blackberry"];

    // 1. Sign in with POM:
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await LoginPage.login("rahulshettyacademy", "learning");
    await ShopPage.checkout.waitForExist();
    await ShopPage.addProductToCart(products);
    await ShopPage.checkout.click();

    // 2. Refactor Review page to use POM:
    let sumOfProducts = await ReviewPage.sumOfProducts();
    let totalIntValue = await ReviewPage.totalFormattedPrice();
    await expect(sumOfProducts).to.equal(totalIntValue);
    await ReviewPage.btnCheckout.click();

    // 3. Refactor Delivery page  to use POM:
    await DeliveryPage.txtLocation.setValue("Ind");
    await DeliveryPage.selectCountry("India");
    await DeliveryPage.btnPurchase.click();
    const alertText = await DeliveryPage.message.getText();
    await expect(alertText).to.include("Success");
  });
});
