describe("UI Controls", async () => {
  beforeEach(async () => {
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
  });

  it("Section 7 - Scroll to & hover over", async () => {
    await $("#mousehover").scrollIntoView();
    await browser.pause(3000);
    await $("#mousehover").moveTo(); // 'hover over'
    await browser.pause(3000);
    await $("=Top").click(); // use '=' to specify an element based on it's exact text. Commonly used for links. but can be used for other elements
    await browser.pause(3000);
  });
});
