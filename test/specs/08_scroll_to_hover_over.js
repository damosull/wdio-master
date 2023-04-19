// How to scroll to an invisible element, & how to mouse over an element

// .scrollIntoView() - scroll this element into view
// .moveTo() - hover over this element
// '=Top' - locate the element with text 'Top'

describe("Scroll to & hover over", async () => {
  it("Section 7 - Scroll to & hover over", async () => {
    await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
    await $("#mousehover").scrollIntoView();
    await browser.pause(3000);
    await $("#mousehover").moveTo(); // 'hover over'
    await browser.pause(3000);
    await $("=Top").click(); // use '=' to specify an element based on it's exact text. Commonly used for links. but can be used for other elements
    await browser.pause(3000);
  });
});
