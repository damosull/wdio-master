// Checkboxes
// Nothing different from what we've been doing up to this point.
// We'll just show again how you can use `input[type=’value’]` to store all matching elements in an array & then use the index to `.click()` one
// You can also check if a checbkox `isSelected()`. Below, we'll log that to the console

// Screenshots
// Later in the lectures, we'll go through how to automatically take screenshots for tests that fail.
// Here, we'll show how you can programmatically take screenshots if you wanted to:
// `browser.saveScreenshot('screenshot.png')` adds the screenshot to the root of your project by default. You can specify a different path if required.

describe("Checkboxes & Screenshots", async () => {
  it("Section 7 - Checkboxes & Screenshots", async () => {
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
    const element = await $$("input[type='checkbox']");
    await element[1].click();
    console.log(await element[1].isSelected());
    console.log(await element[2].isSelected());
    await browser.saveScreenshot("screenshot.png");
  });
});
