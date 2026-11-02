describe('OrangeHRM Login with Intercept - 8 Test Cases', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    // 1. TC_001: Login sukses dengan intercept data employees
    it('TC_LOG_001 - Berhasil login dengan kredensial valid menggunakan intercept dashboard', () => {
        cy.intercept('GET', '**/dashboard/employees/**').as('getEmployees')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@getEmployees')
        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb').should('be.visible')
    })

    // 2. TC_002: Password salah dengan intercept core messages
    it('TC_LOG_002 - Gagal login dengan password salah menggunakan intercept messages', () => {
        cy.intercept('GET', '**/core/i18n/messages').as('getMessages')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('SalahPassword')
        cy.get('button[type="submit"]').click()

        cy.wait('@getMessages')
        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    })

    // 3. TC_003: Username salah dengan intercept auth action
    it('TC_LOG_003 - Gagal login dengan username salah menggunakan intercept auth', () => {
        cy.intercept('POST', '**/auth/validate').as('postAuth')

        cy.get('input[name="username"]').type('UserSalah')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    })

    // 4. TC_004: Username kosong dengan intercept action summary
    it('TC_LOG_004 - Error saat username kosong menggunakan intercept action summary', () => {
        cy.intercept('GET', '**/dashboard/employees/action-summary').as('getActionSummary')

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
    })

    // 5. TC_005: Password kosong dengan intercept shortcuts
    it('TC_LOG_005 - Error saat password kosong menggunakan intercept shortcuts', () => {
        cy.intercept('GET', '**/dashboard/shortcuts').as('getShortcuts')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
    })

    // 6. TC_006: Kombinasi huruf besar/kecil pada username dengan intercept buzz feed
    it('TC_LOG_006 - Login sukses case-insensitive username dengan intercept buzz', () => {
        cy.intercept('GET', '**/buzz/feed**').as('getBuzzFeed')

        cy.get('input[name="username"]').type('AdMiN')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')
    })

    // 7. TC_007: Masking password dengan intercept leaves data
    it('TC_LOG_007 - Kolom password memiliki tipe password dengan intercept leaves', () => {
        cy.intercept('GET', '**/dashboard/employees/leaves**').as('getLeaves')

        cy.get('input[name="password"]').should('have.attr', 'type', 'password')
    })

    // 8. TC_008: Forgot password dengan intercept request reset
    it('TC_LOG_008 - Berpindah ke halaman reset password dengan intercept request password', () => {
        cy.intercept('GET', '**/auth/requestPasswordResetCode').as('getResetPassword')

        cy.get('.orangehrm-login-forgot-header').click()

        cy.url().should('include', 'requestPasswordResetCode')
        cy.get('.orangehrm-forgot-password-container').should('be.visible')
    })

})