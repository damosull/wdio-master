import { expect } from "chai";

describe("JS Alerts Pop Up", () => {
  it("Section 7 - Sorting Web HTML Tables & verifying new order based on names", async () => {
    await browser.url(
      "https://rahulshettyacademy.com/seleniumPractise/#/offers"
    );
    await $("tr th:nth-child(1)").click(); // click the 1st table header

    // 1. Retrieve the list of food names into Array 1
    // 2. Sort Array 1 (this will be stored as Array 2)
    // 3. Compare Array 1 vs. Array 2

    // 1
    const vegElements = await $$("tr td:nth-child(1)"); // get the 1st td of each table row
    const originalVegNames = await Promise.all(
      vegElements.map((veg) => veg.getText())
    ); // loop through all the veg elements & map them to an array of promises that will eventually resolve to the text of each element
    // Promise.all() will wait for all the promises to resolve, & then return an array of resolved values. These resolved values will be used later in the comparison
    console.log(originalVegNames);

    // 2
    const veggies = originalVegNames.slice();
    // .slice() creates a copy of the original array (veg list) to avoid any side effects (in case we modify the original array)
    // This copy is then sorted (sort()), this will be used later in the comparison
    const sortedVeggies = veggies.sort();
    console.log(sortedVeggies);

    // 3
    expect(originalVegNames).to.eql(sortedVeggies);
  });
});
