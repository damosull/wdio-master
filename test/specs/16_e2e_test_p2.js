// Here, we'll focus on gathering the sum of the individual items in the cart.
// We'll skip over the first 3 steps below as they are explained in the previous spec file
// We're going to show you 2 ways to approach this. The 1st uses less code, but is a bit more complex. The 2nd approach uses for loops

// 1. Log in
// 2. Loop through all products & get the link text values
// 3. During the loop, if the text is in our list, click the Add button
// What we'll cover here:
// 4. Gathering the sum of the individual items in the cart (using .map(), .split(), .trim(), & reduce())
// 5. Another way to get the sum of the individual items in the cart
// 6. Comparing the sum of the individual items vs. the total amount
// 7. Selecting a country from an autosuggestion dropdown

import { expect } from "chai";

describe("eCommerce App", async () => {
  it("Smoke E2E Test", async () => {
    const products = ["iphone X", "Blackberry"];

    (await $('#inpu-g')).setValue('02090')

    // 1. Sign in:
    await browser.url("/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");
    await $("#signInBtn").click();

    // 2. Loop through all products & get the link text values
    const link = await $("*=Checkout"); // link text (wait until checkout button is displayed:)
    await link.waitForExist();

    const cards = await $$('div[class="card h-100"]');
    for (let i = 0; i < (await cards.length); i++) {
      const card = await cards[i].$("div h4 a");

      // 3. During the loop, if the text is in our list, click the 'Add' button
      if (products.includes(await card.getText())) {
        await cards[i].$(".card-footer button").click();
        // await browser.pause(15000);
      }
    }

    await link.click(); // Click the checkout button to bring you to the next page

    // 4. Method 1: Gathering the sum of the individual items in the cart (using .map(), .split(), .trim(), & reduce())
    // This approach uses less code, but is a bit more complex to understand initially

    // Store all price tag elements in an array
    const productPrices = await $$("tr td:nth-child(4) strong");

    // Map the text of each item in the `productPrices` locator array to integers - `productPrices.map((productPrice) => parseInt(productPrice.getText()))`
    // To get the explanation of what `.map()` does again, look at `vegElements.map((veg) => veg.getText())` in the `10_sorting_tables.js` spec file
    // Problem with the above is that if we convert the text to an integer, it'll fail because we have non-integer characters there
    // So, we need to use `.split()` to split the text based on a specific character.
    // `.split()` breaks the string into an array. The passed in argument specifies where the string splits:
    // Code: `productPrice.getText()).split(".")`
    // We want to use the 2nd array item because that's where the price is, so we use:
    // Code: `productPrice.getText()).split(".")[1]`
    // The next problem is that there is some space in the string, so we remove that using `.trim()`
    // Now, we have to use the `.reduce()` function to calculate  the sum of the prices.
    // We pass the array of trimmed prices to the `.reduce()` function as the 1st argument. The 2nd argument passed is 0 (the initial value of the accumulator value `acc`)
    // Code:
    // await productPrices.map(async (productPrice) =>
    //           parseInt((await productPrice.getText()).split(".")[1].trim())
    //         ).reduce((acc, price) => acc + price, 0)
    // The `.reduce()` function interates over each element of the array, adding it's value to the accumulator `acc`. The final value of `acc` is the sum of all prices
    // After that, we now need to add async/awaits where applicable
    // Add an await for `.getText()`. The problem here is that in this line of code, this is the only function that returns a promise. To fix this, we need to wrap .getText() in brackets, then split & trim what the promise returns
    // Also add `async` inside the map() function
    // As there are multiple awaits in this line of code, we need to add a Global await & use `Promise.all()`
    // Now, we can log the sum of the prices.
    // This is just one method of dealing with this scenario.
    // This can

    let sumOfProducts = (
      await Promise.all(
        await productPrices.map(async (productPrice) =>
          parseInt((await productPrice.getText()).split(".")[1].trim())
        )
      )
    ).reduce((acc, price) => acc + price, 0);

    console.log("1st Approach: " + sumOfProducts);
    // await browser.pause(10000);

    // This is 1 way of approaching this scenario. Now, we're going to show you how to use a for loop instead of .reduce()
    // With the above approach, there is a bit less code, but it's a bit more complex to understand at the beginning.

    // 5. Method 2:
    // The only difference here is that we're using a for loop instead of the .reduce() function
    // It's a bit easier for us to understand, but does the same thing.
    // We just create a variable to store the prices & then loop through the prices & add them to that variable

    // let sumOfPrices = 0;

    // let prices = await Promise.all(
    //   productPrices.map(async (productPrice) =>
    //     parseInt((await productPrice.getText()).split(".")[1].trim())
    //   )
    // );

    // for (let i = 0; i < prices.length; i++) {
    //   sumOfPrices += prices[i];
    // }

    // console.log("2nd Approach: " + sumOfPrices);
    // await browser.pause(10000);

    // 6. Next, we need to compare the sum of the products vs. the total amount
    // When getting the value, again we have to use .split(), .trim(), & .parseInt() to get the number value from the string
    const totalValue = await $("h3 strong").getText();
    const totalIntValue = parseInt(totalValue.split(".")[1].trim());
    // We import chai at the top of the file again so we can compare the values below
    await expect(sumOfProducts).to.equal(totalIntValue);

    // 7. Now, we need to checkout by selecting a country from the autosuggestion dropdown
    await $(".btn-success").click();
    await $("#country").setValue("Ind");
    // Wait until the loading bar disappears:
    await $(".lds-ellipsis").waitForExist({ reverse: true }); // 'reverse' basically means do the opposite of what the function is meant to do
    await $("=India").click();
    await $("input[type='submit']").click();

    const alertText = await $(".alert-success").getText();
    await expect(alertText).to.include("Success");

    // Next, we're going to look at how to optimize this test case by using the Page Object pattern
  });
});
