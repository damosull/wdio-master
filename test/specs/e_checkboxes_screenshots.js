describe("UI Controls", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
  });

  it("Section 7 - Checkboxes & screenshots", async () => {
    const element = await $$("input[type='checkbox']");
    await element[1].click();
    console.log(await element[1].isSelected());
    console.log(await element[2].isSelected());
    await browser.saveScreenshot("screenshot.png");
  });
});
