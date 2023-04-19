// Simple Assertions & adding awaits/async
// 1. To begin, we're going to use some simple WebDriver assertions (https://webdriver.io/docs/api/expect-webdriverio/)
// 2. We're also going to show how to use `await` & `async`
// 3. CSS & XPath Selectors & selectors plugins
// 4. Show you how to use `waitUntil()` - waits until something is true/false/etc

// CSS Selectors:
// ID (#) – $(“#username”)
// Class (.) – $(“.username”)
// TagName[attribute=’value’] – input[name=’username’]

// XPath Selectors:
// //tagname[@attribute=’value’]
// //input[@type=’password’]

// Selector Plugins:
// SelectorsHub & ChroPath
// Go through how to install & use the above. But need to check they work, because on some sites they don't
// It's a good idea to verify your selectors are correct by entering them into one of these plugins

describe("First Tests", async () => {
  it("WDIO Assertions & Hard-Coded Waits", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");

    // Now we're going to show you some examples of WDIO assertions
    // And as mentioned earlier, we need to add `await` & `async` to our code to make sure our promises get resolved before moving onto the next line of code
    // Where do we add await & async?
    // Add await wherever an action is being performed / a function is being called (i.e. .url(), .toHaveTitle())
    // Add async at the start of the function

    console.log(await browser.getTitle());

    await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");

    await $("input[name='username']").setValue("damosull");
    await $("#username").setValue("QA user");

    // Instead of just directly performing an action on the element, you can store it in a variable like this & use it later:
    const password = $("//input[@type='password']");
    await password.setValue("myPassword");
    await $("#signInBtn").click();

    // As our tests run quickly & sometimes you can't see they actually work, when we're developing them, we can use `.pause(3000)` to verify they are working as expected
    await browser.pause(3000);

    await console.log("!!!!!!!" + (await $(".alert-danger").getText()));
  });

  it("Login Failure - Wait Until button text matches", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await browser.getTitle());

    await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");

    await $("input[name='username']").setValue("damosull");
    await $("#username").setValue("QA user");

    const password = $("//input[@type='password']");
    await password.setValue("myPassword");
    await $("#signInBtn").click();

    await browser.waitUntil(
      async () => (await $("#signInBtn").getAttribute("value")) === "Sign In",
      {
        timeout: 5000,
        timeoutMsg: "damo",
      }
    );

    await console.log(await $(".alert-danger").getText());
  });

  it("Assertions", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await expect($("p")).toHaveTextContaining(
      "username is rahulshettyacademy and Password is learning"
    );
  });

  it("Login Success", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");

    const password = $("//input[@type='password']");
    await password.setValue("learning");
    await $("#signInBtn").click();

    // wait until the new page loads (wait until the checkout button is visible):
    await $(".btn-primary").waitForExist();
    await expect(browser).toHaveUrlContaining("shop");
    await expect(browser).toHaveTitle("ProtoCommerce");
  });
});
