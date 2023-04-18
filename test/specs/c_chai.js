import { expect } from "chai";

// README: The reason we are moving this to a different file is so that we can use the Chai assertions
// When using chai assertions, we use `expect` from the chai library.
// In the tests up to now, we have been using `expect` from the WDIO library.
// If we have both in the same test suite, WDIO doesn't know where to get `expect` from
// Rahul used `require` to get around this, but we don't have that, so we need to use `import`
// Long term, we'll probably need to figure out how we can have both in the same file

describe("UI Controls", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");
  });

  it("Section 6 - Asserting Select dropdowns using Chai", async () => {
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
