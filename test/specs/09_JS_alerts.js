import { expect } from "chai";

// Section 7 - JavaScript alerts

// Note: The JS Alerts on Rahul's website weren't working, so I used the JS alerts on the-internet instead & they work as expected
// Note: Rahul's alert didn't work, but if it did work, you needed to double-click a button. He did that using `await $("button").doubleClick();`. This is just for future reference if required

// For JS Alerts, you can't inspect them because they don't have any HTML behind them. Therefore, we have to use the following:
// - .isAlertOpen() - checks if the alert is open
// - .getAlertText() - gets the text within the alert
// - .acceptAlert() - accepts & closes the alert pop-up

describe("JS Alerts Pop Up", async () => {
  it("Section 7 - Handle JS Alerts Pop Up", async () => {
    await browser.url("https://the-internet.herokuapp.com/javascript_alerts");
    await $("button").click();
    console.log(await browser.isAlertOpen());
    await browser.pause(3000);
    expect(await browser.isAlertOpen()).to.be.true;
    expect(await browser.getAlertText()).to.equal("I am a JS Alert");
    await browser.acceptAlert();
    await browser.pause(3000);
  });
});
