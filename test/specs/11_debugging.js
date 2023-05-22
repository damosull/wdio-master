// We'll covering debugging here to show you how you can check different objects values during a test & after certain stages of the test

// First, we'll make some changes to get VS Code set up for debugging.
// Then, we'll go through the configuration changes
// Finally, we'll debug a simple test

// 1. Setting up to debug WDIO tests:
//
// Official WDIO docs: https://webdriver.io/docs/debugging/
// In the docs above, go to the VS Code section. There, you'll see the VS Code plugin you need to add & a sample configuration
// Create a `.vscode/launch.json` file at the root of your project
// After creating this file, click the 'Add Configuration' button that appears at the bottom-right of your screen
// Paste the below configuration ito the `Configurations` array:
// {
//   "name": "WebDriverIO Test",
//   "type": "node",
//   "request": "launch",
//   "args": ["wdio.conf.js"],
//   "cwd": "${workspaceFolder}",
//   "autoAttachChildProcesses": true,
//   "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
//   "console": "integratedTerminal",
//   "skipFiles": [
//       "${workspaceFolder}/node_modules/**/*.js",
//       "${workspaceFolder}/lib/**/*.js",
//       "<node_internals>/**/*.js"
//   ]
// },

// Note: `launch.json` can hold multiple configurations

// 2. Explaining the configuration:
//
// - "args": the cmd line arguments you'll be passing when running the test (i.e. `wdio.conf.js` is the arg we pass when running `npx wdio run wdio.conf.js`
// - "cwd": where you want to run this command (the working directory). the value specified in our example is the root directory of this project
// - "program": similar to `npx wdio` in the original run command. specifies the program to launch. in this case, it's set to the WDIO CLI, which is used to run WDIO tests

// 3. Debugging your test:
//
// After adding your breakpoints, click 'Run' & 'Start Debugging' at the top of VS Code, this will open Chrome
// After a breakpoint is hit, click 'Continue' to resume the test.
// You can hover over objects now to see their current state, value, etc.
// Add a breakpoint to line ` console.log(originalVegNames);` (after you click the Sort button), you can see the `vegElements` list is sorted
// If you comment out clicking the Sort button, & debug again, you'll see the `vegElements` list is not sorted.

import chai from "chai";

describe("JS Alerts Pop Up", () => {
  it("Section 7 - Sorting Web HTML Tables & verifying new order based on names", async () => {
    await browser.url(
      "/seleniumPractise/#/offers"
    );
    // await $("tr th:nth-child(1)").click(); // click the 1st table header

    const vegElements = await $$("tr td:nth-child(1)"); // get the 1st td of each table row
    const originalVegNames = await Promise.all(
      vegElements.map((veg) => veg.getText())
    );
    console.log(originalVegNames);

    const veggies = originalVegNames.slice();
    const sortedVeggies = veggies.sort();
    console.log(sortedVeggies);

    chai.expect(originalVegNames).to.eql(sortedVeggies);
  });
});
