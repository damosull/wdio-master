// We're going to specify clicking the 'Add' button for some products:

// 1. Log in
// 2. Loop through all products & get the link text values
// 3. During the loop, if the text is in our list, click the Add button

describe("eCommerce App", async () => {
  it("E2E Test", async () => {
    const products = ["iphone x", "Blackberry"];

    // 1. Sign in:
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");
    await $("#signInBtn").click();

    // 2. Loop through all products & get the link text values
    // wait until checkout button is displayed:
    const link = await $("*=Checkout"); // link text
    // $('=Checkout') - exact text match
    // $('*=Checkout') - partial text match
    await link.waitForExist();

    const cards = await $$('div[class="card h-100"]');
    // If there's one class in your selector, you can use '.className'
    // If there's multiple classes in your selector, you need to use '[class="card h-100"]'

    for (let i = 0; i < (await cards.length); i++) {
      const card = await cards[i].$("div h4 a");

      // 3. During the loop, if the text is in our list, click the 'Add' button
      if (products.includes(await card.getText())) {
        // We need to switch to the button inside the same
        await cards[i].$(".card-footer button").click();
        await browser.pause(15000);
      }
    }

    await link.click(); // Click the checkout button to bring you to the next page
    await browser.pause(15000);
  });
});
