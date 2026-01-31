class LoginPage {
  constructor(page) {
    this.page = page
    this.userEmail = page.locator('#userEmail')
    this.userPassword = page.locator('#userPassword')
    this.loginButton = page.locator("[value='Login']")
  }

  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/client', {
      waitUntil: 'networkidle',
    })
  }

  async validLogin(email, password) {
    await this.userEmail.fill(email)
    await this.userPassword.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')
  }
}

module.exports = { LoginPage }
