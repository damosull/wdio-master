// 1. How to handle radio buttons
// 2. How to handle multiple elements being returned by a selector
// 3. How to use chain locators for child elements

describe("Radio Buttons", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");
  });

  it("Radio Buttons - when multiple elements have the same locator", async () => {
    // If the selector you're using returns multiple elements, & you want to store all returned elements, you need to use `$$`
    // If the selector you're using returns multiple elemetts, & you only use `$`, then only the 1st element will be returned up
    // Here, we store all matching elements
    const rdoButtons = $$(".radiotextsty");
    const rdoUser = rdoButtons[1]; // Get the 2nd item in the array
    await rdoUser.click();
    await browser.pause(3000);
  });

  it("Radio Buttons - using chain locators for child elements", async () => {
    const rdoButtons = $$(".customradio");
    const rdoUser = rdoButtons[1]; // this is the parent
    // then we get the child by chaining the locator:
    await rdoUser.$("span").click(); // chaining locators - same as saying '.customradio > span' in cypress
    await browser.pause(3000);
  });
});
