// 1. Handling Web Pop Ups / Modals
// Waiting for the modal to be displayed & clicking a button on the modal
// Validate the modal is not displayed after clicking a button

describe("Pop Ups / Modals", async () => {
  it("Pop Ups / Modals", async () => {
    await browser.url("/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");
    const password = $("//input[@type='password']");
    await password.setValue("learning");

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
});
