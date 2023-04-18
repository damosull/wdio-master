describe("UI Controls", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");
  });

  it("Section 6 - Radio Buttons - when multiple elements have the same locator", async () => {
    // If your locator returns multiple elements, you need to use $$ instead of $. Otherwise, only the first element that matches will be returned

    const rdoButtons = $$(".radiotextsty");
    const rdoUser = rdoButtons[1]; // 2nd item in the array
    await rdoUser.click();
    await browser.pause(3000);
  });

  it("Section 6 - Radio Buttons - using chain locators for child elements", async () => {
    const rdoButtons = $$(".customradio");
    const rdoUser = rdoButtons[1];
    await rdoUser.$("span").click(); // chaining locators - same as saying '.customradio > span' in cypress
    await browser.pause(3000);
  });

  it("Section 6 - Pop Ups / Modals", async () => {
    const rdoButtons = $$(".customradio");
    const rdoUser = rdoButtons[1]; // 2nd item in the array
    await rdoUser.$("span").click();

    const modal = $(".modal-body");
    await modal.waitForDisplayed();
    await $("#cancelBtn").click();
    console.log(await $$(".customradio")[1].$("span").isSelected()); // the test won't fail here, you'd need to append .toBe(true)

    await rdoUser.$("span").click();
    await modal.waitForDisplayed();
    await $("#okayBtn").click();

    // Validate the pop-up doesn't display
    await $$(".customradio")[0].$("span").click();
    await expect(modal).not.toBeDisplayed();

    await browser.pause(3000);
  });

  it.only("Section 6 - Select dropdowns", async () => {
    const rdoButtons = $$(".customradio");
    const rdoUser = rdoButtons[1]; // 2nd item in the array
    await rdoUser.$("span").click();

    const modal = $(".modal-body");
    await modal.waitForDisplayed();
    await $("#cancelBtn").click();
    console.log(await $$(".customradio")[1].$("span").isSelected()); // the test won't fail here, you'd need to append .toBe(true)

    await rdoUser.$("span").click();
    await modal.waitForDisplayed();
    await $("#okayBtn").click();

    // Validate the pop-up doesn't display
    await $$(".customradio")[0].$("span").click();
    await expect(modal).not.toBeDisplayed();

    const dropdown = $("select.form-control");
    await dropdown.selectByAttribute("value", "teach");
    await browser.pause(3000);
    await dropdown.selectByVisibleText("Consultant");
    await browser.pause(3000);
    await dropdown.selectByIndex(0);
    await browser.pause(3000);
    console.log(await dropdown.getValue());
    const dropdownValue = await dropdown.getValue();
    await expect(dropdownValue).toEqual("stud");
  });
});
