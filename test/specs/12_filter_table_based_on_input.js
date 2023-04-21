describe("Filter table values based on Search input", async () => {
  it("Section 7 - Filter table values based on Search input", async () => {
    await browser.url(
      "https://rahulshettyacademy.com/seleniumPractise/#/offers"
    );
    await $('input[type="search"]').setValue("tomato");
    const vegLocators = await $$("tr td:nth-child(1)");
    await expect(vegLocators).toBeElementsArrayOfSize({ eq: 1 });
    console.log(await vegLocators[0].getText());
    await expect(await vegLocators[0]).toHaveTextContaining("Tomato");
  });
});
