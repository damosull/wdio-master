// iFrames

// Basically a page embedded in your parent page
// These aren't common in new apps, but we still need to know how to deal with them.

// By default, the browser won't have access to this frame
// The context of this part of the page is inside the frame.

// To access this frame, you need to switch your context from the original page to the frame page.
// Similarly, when you're inside this frame, you won't have access to the parent page (you would need to switch context again)

// It's like another child window/tab, but it's just embedded in the page.

describe("iFrames", async () => {
  it("Section 8 - iFrames", async () => {
    await browser.url("/AutomationPractice/");
    await $("#mousehover").scrollIntoView();
    console.log("# links on the original page: " + (await $$("a").length)); // 27 links in the 1st page
    await browser.pause(5000);

    // .switchToFrame() - takes the usual locators, can also take an index (not sure how though)
    await browser.switchToFrame(await $("[id='courses-iframe']"));
    console.log(await $("=Courses").getTagName());
    console.log("Switching to frame: " + (await $$("a").length)); // 107 links in the frame
    await browser.pause(5000);

    // If you want to switch back to the original window, just pass null to `.switchToFrame()`
    // Passing null means "exit the frame", bringing you back to the original page
    await browser.switchToFrame(null);
    console.log(
      "After switching back to original page: " + (await $$("a").length)
    ); // 27 links in the 1st page
    await browser.pause(5000);
  });
});
