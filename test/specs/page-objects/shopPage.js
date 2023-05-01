class ShopPage {
  get checkout() {
    return $("*=Checkout");
  }

  get cards() {
    return $$('div[class="card h-100"]');
  }

  async addProductToCart(products) {
    for (let i = 0; i < (await this.cards.length); i++) {
      const card = await this.cards[i].$("div h4 a");
      // During the loop, if the text is in our list, click the 'Add' button
      if (products.includes(await card.getText())) {
        await this.cards[i].$(".card-footer button").click();
      }
    }
  }
}
export default new ShopPage();
