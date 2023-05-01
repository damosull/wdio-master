class LoginPage {
  // 1. You could create the username page object like this:
  // username = "asdf";

  // 2. But you can also use getter's in case you needed to perform some actions before returning an object:
  get userName() {
    // console.log('Maybe I need to perform some action before returning the page object')
    return $("input[name='username']");
  }

  get password() {
    return $("//input[@type='password']");
  }

  get alert() {
    return $(".alert-danger");
  }

  get signIn() {
    return $("#signInBtn");
  }

  get textInfo() {
    return $("p");
  }

  // 3. If there are any methods specific to this page, you can add them here (i.e. login):
  async login(username, password) {
    // 4. If an object is in the class you're currently in, call it using `this.`:
    await this.userName.setValue(username);
    await this.password.setValue(password);
    await this.signIn.click();
    // Notice how readable & organized this code now is compared to what we had at the beginning
  }
}
// 5. In order for other files in your project to import this class, you need to export the class:
// module.exports = new LoginPage();
export default new LoginPage();
