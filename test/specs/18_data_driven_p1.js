import LoginPage from "../page-objects/loginPage.js";
// Data Driven - Parameterise test cases using Mocha Framework & JSON files

// Here, we're going to  parameterise test cases with different sets of data.
// And how we can drive data from JSON files

// For this, we're going to test the Invalid Login scenario with different data sets
// We're going to run this test case for different combinations of login credentials
// For example, you could use it for blank values, different types of invalid passwords, etc.

// Steps:
// 1. Create a 'test-data' folder under the 'test' folder.
// 2. Inside `test-data`, create a file called `loginTest.json` for our different combinations of test data.
// Move into that file for the next steps. JSON doesn't allow comments, so I'll write them here.
// Here, we're going to create an array of objects that will store the username & password for each combination we want to test
// We want our test to run for each of the objects inside this JSON array
// 3. After creating the array, we now need to pass the JSON into our spec file:
import fs from "fs";
let credentials = JSON.parse(fs.readFileSync("test/test-data/loginTest.json")); // Here, we convert our JSON file into an array (that we can iterate through)

describe("Data Driven - Parameterise test cases using Mocha Framework & JSON files", async () => {
  // Now wrap our it block inside a forLoop that loops through each object of the 'credentials' array. This will  run the test for each object
  // We pass the username & password arguments for each object & we can now access those values in our test

  credentials.forEach(({ username, password }) => {
    it("Login Failure - Data Driven - Parameterise test cases using Mocha Framework & JSON files", async () => {
      await browser.url("https://rahulshettyacademy.com/loginpagePractise/");

      // 4. Replace the hard-coded values with the values that were passed in from the JSON file. Now run the test & the test runs twice based on the JSON object
      await LoginPage.login(username, password);
      await console.log(await LoginPage.alert.getText());

      await browser.waitUntil(
        async () =>
          (await LoginPage.signIn.getAttribute("value")) === "Sign In",
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
  });
});
