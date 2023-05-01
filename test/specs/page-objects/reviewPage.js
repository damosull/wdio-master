class ReviewPage {
  get productPrices() {
    return $$("tr td:nth-child(4) strong");
  }

  get totalPrice() {
    return $("h3 strong");
  }

  get btnCheckout() {
    return $(".btn-success");
  }

  async sumOfProducts() {
    let sumOfProducts = (
      await Promise.all(
        await this.productPrices.map(async (productPrice) =>
          parseInt((await productPrice.getText()).split(".")[1].trim())
        )
      )
    ).reduce((acc, price) => acc + price, 0);
    console.log("1st Approach: " + sumOfProducts);
    return sumOfProducts;
  }

  async totalFormattedPrice() {
    const totalValue = await this.totalPrice.getText();
    return parseInt(totalValue.split(".")[1].trim());
  }
}
export default new ReviewPage();
