describe("UI Controls", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
  });

  it("Section 7 - Dynamic dropdowns", async () => {
    await $("#autocomplete").setValue("Ind");
    await browser.pause(3000);
    let items = await $$("[class='ui-menu-item'] div");
    for (let i = 0; i < (await items.length); i++) {
      if ((await items[i].getText()) === "India") {
        await items[i].click();
        await browser.pause(3000);
      }
    }
  });
});
