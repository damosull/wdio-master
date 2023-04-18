describe("ECommerce", async () => {
  it("Hard-Coded Waits", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await browser.getTitle());

    await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");

    await $("input[name='username']").setValue("damosull");
    await $("#username").setValue("QA user");

    const password = $("//input[@type='password']");
    await password.setValue("myPassword");
    await $("#signInBtn").click();
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

  it.only("UI Controls ", async () => {
    await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
    await $("#username").setValue("rahulshettyacademy");

    const password = $("//input[@type='password']");
    await password.setValue("learning");

    // Radio Buttons & if your locator returns multiple elements, you need to use $$ instead of $. Otherwise, only the first element that matches will be returned
    const rdoButtons = $$(".radiotextsty");
    const rdoUser = rdoButtons[1]; // 2nd item in the array
    await rdoUser.click();
    await browser.pause(3000);
  });
});
