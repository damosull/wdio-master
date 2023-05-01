class DeliveryPage {
  get txtCountry() {
    return $("*=Checkout");
  }

  get btnPurchase() {
    return $("input[type='submit']");
  }

  get message() {
    return $(".alert-success");
  }

  get txtLocation() {
    return $("#country");
  }

  get loadingIcon() {
    return $(".lds-ellipsis");
  }

  getOption(country) {
    return $(`=${country}`);
  }

  async selectCountry(country) {
    await this.loadingIcon.waitForExist({ reverse: true });
    await this.getOption(country).click();
  }
}
export default new DeliveryPage();
