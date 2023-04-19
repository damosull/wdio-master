// The assertions we’ve been using up to this point (expect, toHaveUrlContaining(), toHaveTextContaining(), etc.) are WebDriverIO assertions.
// If you want to do assertions like comparing strings, you’ll need to use chai: https://www.chaijs.com/api/assert/
// Install chai using `npm i chai`
// The problem now is how does your framework know if `expect` is related to WDIO or Chai, as they both have a function with that name.
// To get around this conflict, Rahul used `require` to get around this, but we weren't able to, & we need to use `import` so I created a new file.
// How to impoert  `expect` from chai in your node_modules:
// `import {expect} from ‘chai`
// Now we can say ` await expect(value).to.equal(‘stud’)`

import { expect } from "chai";

describe("UI Controls", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");
  });

  it("Asserting Select dropdowns using Chai", async () => {
    const rdoButtons = $$(".customradio");
    const rdoUser = rdoButtons[1]; // 2nd item in the array
    await rdoUser.$("span").click();

    const modal = $(".modal-body");
    await modal.waitForDisplayed();
    await $("#cancelBtn").click();
    await rdoUser.$("span").click();
    await modal.waitForDisplayed();
    await $("#okayBtn").click();

    // Validate the pop-up doesn't display
    await $$(".customradio")[0].$("span").click();

    const dropdown = $("select.form-control");
    await dropdown.selectByAttribute("value", "teach");
    await browser.pause(3000);
    await dropdown.selectByVisibleText("Consultant");
    await browser.pause(3000);
    await dropdown.selectByIndex(0);
    await browser.pause(3000);
    console.log(await dropdown.getValue());
    const dropdownValue = await dropdown.getValue();
    await expect(dropdownValue).to.equal("stud");
  });
});
