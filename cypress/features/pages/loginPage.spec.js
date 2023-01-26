class loginPage {
    get titleH4() {return cy.get("p[class='h4 login-title']")}
    get email() { return cy.get('input[name="email"]') }
    get password() { return cy.get('input[name="password"]') }
    get submitBtn() { return cy.get('button[type="submit"]') }
  
    visit() {
      cy.visit('/login')
    }
  
    login(email, password) {
      this.email.type(email)
      this.password.type(password)
      this.submitBtn.click()
    }
  }
  const loginpage = new loginPage()
  export default loginpage