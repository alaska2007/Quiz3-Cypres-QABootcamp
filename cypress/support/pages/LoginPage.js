class LoginPage {
    // Penyimpanan Elemen (Locators)
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content-text'),
        requiredError: () => cy.get('.oxd-input-field-error-message'),
        forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
        forgotPasswordContainer: () => cy.get('.orangehrm-forgot-password-container')
    }

    // Metode Aksi (Actions)
    navigate() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    enterUsername(username) {
        this.elements.usernameInput().type(username)
    }

    enterPassword(password) {
        this.elements.passwordInput().type(password)
    }

    clickLogin() {
        this.elements.loginButton().click()
    }

    clickForgotPassword() {
        this.elements.forgotPasswordLink().click()
    }

    // Helper method untuk menggabungkan proses input dan klik login secara dinamis
    login(username, password) {
        if (username) {
            this.enterUsername(username)
        }
        if (password) {
            this.enterPassword(password)
        }
        this.clickLogin()
    }
}

export default new LoginPage()