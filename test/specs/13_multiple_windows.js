// Multiple Windows / Child Windows

// Here, we're going to go through how to manage windows that are opened via the application , & windows that are opened via the automation
// In automation, opening a new window or a new tab are both treated the same

// Initially, WDIO is only focused on / has access to the original page

// To switch focus to a different window/tab, use `.switchToWindow(...)`. In order to use this, you need to pass in the handle of the new window to this function.
// To get the window's handle, assign `.getWindowHandles()` to a variable. You can then specify which handle you want to use (i.e. handles[1])

// When you are done with a window, you can call `.closeWindow()`
// If you call `.closeWindow()` on the current window, you are not automatically switched to another window. You will need to switch to another window (.switchToWindow())
// You don't have to close the existing window/tab before switching to a different window/tab

describe("Multiple Windows", async () => {
  it("Section 8 - Multiple Windows", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await browser.pause(6000);
    await $(".blinkingText").click();
    const handles = await browser.getWindowHandles(); // 2 windows now because you've opened a new tab

    await browser.switchToWindow(handles[1]); // switch to the 2nd window/tab
    console.log("Header Text:" + (await $("h1").getText())); // 2nd tab
    console.log("1st title: " + (await browser.getTitle())); // 2nd tab
    await browser.pause(6000);
    await browser.closeWindow(); // closes the current tab/window (in this case, the 2nd tab)
    await browser.pause(6000);
    await browser.switchToWindow(handles[0]); // now that we have closed the window above, we now need to switch to a different window (In this case, the original tab)
    // If you didn't switch back to the original tab before carrying on with this test, the test would fail because the 'target' window (which would be the 2nd one as we switched to that above, has been closed)
    console.log("2nd title: " + (await browser.getTitle())); // 1st tab
    await $("#username").setValue("Switched back to the 1st window");
    await browser.pause(6000);
  });

  // Next, we're going to see how you can open a new window via the automation:

  // Difference between switchToWindow() & newWindow():

  // 1. When they are used:
  // If the app opens a new window (i.e. clicking a button) - use `.switchToWindow()`
  // If the automation opens a new window/tab (i.e. a different application) - use `.newWindow()`

  // 2. Focus:
  // If the application opens the new window/tab, you need to switch the focus (using .switchToWindow())
  // If the automation opens the new window/tab, the focus automatically switches to the new window, you don't need to switch. This becomes the parent window.

  it("Section 8 - Difference between SwitchWindow & NewWindow methods", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await browser.pause(6000);

    await browser.newWindow("https://www.google.com"); // we're going to use .newWindow() to open a new tab/window for us
    await browser.pause(6000);
    console.log("New Window Title: " + (await browser.getTitle()));

    // Now that we're in the new window. Say we want to switch back to the original window/tab, we use `.switchWindow()` instead of `.switchToWindow()`
    // Just pass in the original URL:
    await browser.switchWindow(
      "https://rahulshettyacademy.com/loginpagePractise/"
    );

    //Note the difference between `.switchToWindow()` & `.switchWindow()`:
    // `.switchToWindow()` - can only be used when browser is opened via application (i.e. clicking a link)
    // `.switchWindow()` - can be used both when browser is opened via application & automation (you just need to pass in the URL of an existing window/tab)

    await $("#username").setValue("Switched back from the New Window");
    await browser.pause(6000);
  });
});
